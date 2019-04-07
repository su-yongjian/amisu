MVVM实现的思路：

​	在2.6版本以前是通过数据劫持结合发布者-订阅者模式方式实现的，通过Object.defineProperty()来劫持各个属性的setter和getter方法，在数据变动时发布消息给订阅者，触发响应的回调，这也是vue不支持IE8以下浏览器的原因之一。

​	思路：

- 实现一个Compie模板解析器，能够对模板中的指令和插值表达式进行解析，并赋予对应的操作

- 实现一个Observer数据监听器，能够对数据对象（data）的所有属性进行监听

- 实现一个Watcher侦听器。将Compile的解析结果，与Observer所观察的对象连接起来，建立关系，在Oberver观察到数据对象变化是，接受通知，并更新DOM

- 创建一个公共的入口（VUE），接收初始化配置，并协调Compile、Observer、Watcher模块

  

一：Vue入口：

+ 把data和methods挂载到根实例中；
+ Observer模块监听data所有属性的变化
+ 如果存在挂载点，则用Compile模块编译该挂载点下的所有指令和插值表达式

```javascript
/**
 * vue.js (入口文件)
 * 1. 将data,methods里面的属性挂载根实例中
 * 2. 监听 data 属性的变化
 * 3. 编译挂载点内的所有指令和插值表达式
 */
class Vue{
  constructor(options={}){
    this.$el = options.el;
    this.$data = options.data;
    this.$methods = options.$methods;
    debugger
    // 将data，methods里面的属性挂载到根实例
    this.proxy(this.$data);
    this.proxy(this.$methods);
    // 监听数据
    // new Observer(this.$data)
    if(this.$el){
      // new Compile(this.$el,this)
    }
  }
  proxy(data={}){
    Object.keys(data).forEach(key=>{
      // 这里的this指向vue实例
      Object.defineProperty(this,key,{
        enumerable:true,//可枚举
        configurable:true,//可配置
        set(value){
          if(data[key] === value ) return
          return value
        },
        get(){
          return data[key]
        }
      })
    })
  }
}
 
二：Compile模块
```

+ compile主要做的事情是解析指令（属性节点）与插值表达式（文本节点），将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图。

  因为遍历解析的过程有多次操作dom节点，这会引发页面的**回流与重绘**的问题，为了提高性能和效率，我们最好是在内存中解析指令和插值表达式，因此我们需要遍历挂载点下的所有内容，把它存储到DocumentFragments中。

  - DocumentFragments 是DOM节点。它们不是主DOM树的一部分。通常的用例是创建文档片段，将元素附加到文档片段，然后将文档片段附加到DOM树。因为文档片段存在于内存中，并不在DOM树中，所以将子元素插入到文档片段时不会引起页面回流（对元素位置和几何上的计算）。因此，使用文档片段通常会带来更好的性能。

+ 所以我们需要一个`node2fragment()`方法来处理上述逻辑。

- 实现node2fragment，将挂载点内的所有节点存储到DocumentFragment中

```
    node2fragment(node) {
        let fragment = document.createDocumentFragment()
        // 把el中所有的子节点挨个添加到文档片段中
        let childNodes = node.childNodes
        // 由于childNodes是一个类数组,所以我们要把它转化成为一个数组,以使用forEach方法
        this.toArray(childNodes).forEach(node => {
            // 把所有的字节点添加到fragment中
            fragment.appendChild(node)
        })
        return fragment
    }
this.toArray()是我封装的一个类方法，用于将类数组转化为数组。实现方法也很简单，我使用了开发中最常用的技巧：
toArray(classArray) {
    return [].slice.call(classArray)
}
```

### 解析fragment里面的节点

递归遍历fragment里面的所有子节点，根据节点类型进行判断，如果是文本节点则按插值表达式进行解析，如果是属性节点则按指令进行解析。在解析属性节点的时候，我们还要进一步判断：是不是由`v-`开头的指令，或者是特殊字符，如`@`、`:`开头的指令。

```javascript
// Compile.js
class Compile {
    constructor(el, vm) {
        this.el = typeof el === "string" ? document.querySelector(el) : el
        this.vm = vm
        // 解析模板内容
        if (this.el) {
        // 为了避免直接在DOM中解析指令和差值表达式所引起的回流与重绘,我们开辟一个Fragment在内存中进行解析
        const fragment = this.node2fragment(this.el)
        this.compile(fragment)
        this.el.appendChild(fragment)
        }
    }
    // 解析fragment里面的节点
    compile(fragment) {
        let childNodes = fragment.childNodes
        this.toArray(childNodes).forEach(node => {
            // 如果是元素节点,则解析指令
            if (this.isElementNode(node)) {
                this.compileElementNode(node)
            }

            // 如果是文本节点,则解析差值表达式
            if (this.isTextNode(node)) {
                this.compileTextNode(node)
            }

            // 递归解析
            if (node.childNodes && node.childNodes.length > 0) {
                this.compile(node)
            }
        })
    }
}

```

### 处理解析指令的逻辑：CompileUtils

当数据发生改变时，通过Watcher对象监听expr数据的变化，一旦数据发生变化，则执行回调函数。

`new Watcher(vm,expr,callback)` // 利用Watcher将解析后的结果返回给视图.

```javascript
// Compile.js
let CompileUtils = {
    getVMData(vm, expr) {
        let data = vm.$data
        expr.split('.').forEach(key => {
            data = data[key]
        })
        return data
    },
    setVMData(vm, expr,value) {
        let data = vm.$data
        let arr = expr.split('.')
        arr.forEach((key,index) => {
            if(index < arr.length -1) {
                data = data[key]
            } else {
                data[key] = value
            }
        })
    },
    // 解析插值表达式
    mustache(node, vm) {
        let txt = node.textContent
        let reg = /\{\{(.+)\}\}/
        if (reg.test(txt)) {
            let expr = RegExp.$1
            node.textContent = txt.replace(reg, this.getVMData(vm, expr))
            new Watcher(vm, expr, newValue => {
                node.textContent = txt.replace(reg, newValue)
            })
        }
    },
    // 解析v-text
    text(node, vm, expr) {
        node.textContent = this.getVMData(vm, expr)
        new Watcher(vm, expr, newValue => {
            node.textContent = newValue
        })
    },
    // 解析v-html
    html(node, vm, expr) {
        node.innerHTML = this.getVMData(vm, expr)
        new Watcher(vm, expr, newValue => {
            node.innerHTML = newValue
        })
    },
    // 解析v-model
    model(node, vm, expr) {
        let that = this
        node.value = this.getVMData(vm, expr)
        node.addEventListener('input', function () {
            // 下面这个写法不能深度改变数据
            // vm.$data[expr] = this.value
            that.setVMData(vm,expr,this.value)
        })
        new Watcher(vm, expr, newValue => {
            node.value = newValue
        })
    },
    // 解析v-on
    eventHandler(node, vm, eventType, expr) {
        // 处理methods里面的函数fn不存在的逻辑
        // 即使没有写fn,也不会影响项目继续运行
        let fn = vm.$methods && vm.$methods[expr]
        
        try {
            node.addEventListener(eventType, fn.bind(vm))
        } catch (error) {
            console.error('抛出这个异常表示你methods里面没有写方法\n', error)
        }
    }
}

```

三：Observer模块

其实在Observer模块中，我们要做的事情也不多，就是提供一个`walk()`方法，递归劫持`vm.$data`中的所有数据，拦截setter和getter。如果数据变更，则发布通知,让所有订阅者更新内容，改变视图。

需要注意的是，如果设置的值是一个对象，则我们需要保证这个对象也要是响应式的。 用代码来描述即：`walk(aObjectValue)`。关于如何实现响应式对象，我们采用的方法是`Object.defineProperty()`

```javascript
// Observer.js
class Observer { 
    constructor(data){
        this.data = data
        this.walk(data)
    }
    
    // 遍历walk中所有的数据,劫持 set 和 get方法
    walk(data) {
        // 判断data 不存在或者不是对象的情况
        if(!data || typeof data !=='object') return

        // 拿到data中所有的属性
        Object.keys(data).forEach(key => {
            // console.log(key)
            // 给data中的属性添加 getter和 setter方法
            this.defineReactive(data,key,data[key])

            // 如果data[key]是对象,深度劫持
            this.walk(data[key])
        })
    }

    // 定义响应式数据
    defineReactive(obj,key,value) {
        let that = this
        // Dep消息容器在Watcher.js文件中声明，将Observer.js与Dep容器有关的代码注释掉并不影响相关逻辑。
        let dep = new Dep()
        Object.defineProperty(obj,key,{
            enumerable:true,
            configurable: true,
            get(){
                // 如果Dep.target 中有watcher 对象,则存储到订阅者数组中
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set(aValue){
                if(value === aValue) return
                value = aValue
                // 如果设置的值是一个对象,那么这个对象也应该是响应式的
                that.walk(aValue)

                // watcher.update
                // 发布通知,让所有订阅者更新内容
                dep.notify()
            }
        })
    }
} 
```

四：Watcher模块:Watcher的作用就是将Compile解析的结果和Observer观察的对象关联起来，建立关系，当Observer观察的数据发生变化是，接收通知（`dep.notify`）告诉Watcher，Watcher在通过Compile更新DOM。

Watcher是连接Compile和Observer的桥梁。

我们在Watcher的构造函数中，需要传递三个参数：

- `vm` ：vue实例
- `expr`：vm.$data中数据的名字（key）
- `callback`：当数据发生改变时，所执行的回调函数

注意，为了获取深层数据对象，这里我们需要引用之前声明的`getVMData()`方法。

### 定义Watcher

````javascript
constructor(vm,expr,callback){
    this.vm = vm
    this.expr = expr 
    this.callback = callback
    
    //
    this.oldValue = this.getVMData(vm,expr)
    //
}

````

### 暴露update()方法,用于在数据更新时更新页面:我们应该在Watcher中实现一个update方法，对新值和旧值进行比较。当数据发生改变时，执行回调函数。

```javascript
update() {
    // 对比expr是否发生改变,如果改变则调用callback
    let oldValue = this.oldValue
    let newValue = this.getVMData(this.vm,this.expr)

    // 变化的时候调用callback
    if(oldValue !== newValue) {
        this.callback(newValue,oldValue)
    }
}
```

太过高深：看不下去了：参考：https://juejin.im/post/5ca456bfe51d456d3c45fef4

