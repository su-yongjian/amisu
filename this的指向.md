**this指向的，永远只可能是对象！**
**this指向谁，永远不取决于this写在哪！而是取决于函数在哪调用。**
**this指向的对象，我们称之为函数的上下文context，也叫函数的调用者。**

1：通过函数名直接调用：this指向window

```javascript
function func(){
    console.log(this);
}	


//① 通过函数名()直接调用：this指向window
func(); // this--->window
```

2:**通过对象.函数名()调用的：this指向这个对象**

```
function func(){
	console.log(this);
}
//② 通过对象.函数名()调用的：this指向这个对象
// 狭义对象
var obj = {
    name:"obj",
    func1 :func
};
obj.func1(); // this--->obj

// 广义对象
document.getElementById("div").onclick = function(){
	this.style.backgroundColor = "red";
}; // this--->div
```

**函数作为数组的一个元素，通过数组下标调用的：this指向这个数组**

```
function func(){
	console.log(this);
}
//③ 函数作为数组的一个元素，通过数组下标调用的：this指向这个数组
var arr = [func,1,2,3];
arr[0]();  // this--->arr
```

**函数作为window内置函数的回调函数调用：this指向window（ setInterval setTimeout 等）**

```
function func(){
	console.log(this);
}

//④ 函数作为window内置函数的回调函数调用：this指向window
setTimeout(func,1000);// this--->window
//setInterval(func,1000);
```

**函数作为构造函数，用new关键字调用时：this指向新new出的对象**

```
function func(){
	console.log(this);
}
//⑤ 函数作为构造函数，用new关键字调用时：this指向新new出的对象
var obj = new func(); //this--->new出的新obj
```

