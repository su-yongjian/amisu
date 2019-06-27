在react中如果希望不发生转义：<h2>deme</h2> 可以用这个语法表示：

```
dangerouslySetInnerHTML={__html:xxxx}

```

label的for要改为htmlFor

class类名称改为className

子组件接受父组件传过来的值，this.props.xxx

子组件向父组件传值：

父组件 fn={this.handle.bind(this)}

在子组件直接调用父组件的方法：this.props.fn   ===  this.handle

新版的react中，

this.setState({list:_list})   ===  this.setState(() => ({list:_this.state.list}))  === this.setState((prevState) => ({list:prevState.list}))  === this.setState((prevState) => { return {list:prevState.list })

