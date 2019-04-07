// 入口
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



