import React,{Component} from "react"

export default class Lifecycle extends Component{
  constructor(props){
    super(props)
    console.log('1,构造函数');
    
    this.state = {
      msg: '来自属性传递' + props.title
    }
  }
  componentWillMount(){
    // 此时可以访问属性和状态，可以进行api调用，但是没有办法做dom相关操作
    console.log('2.组件将要挂载');
  }
  componentDidMount(){
    // 此时可以访问属性和状态，可以进行api调用，可以做dom相关操作
    console.log('3.组件已经挂载');
    

  }
  componentWillReceiveProps(){
    // 父组件传递的属性有变化，做相应的响应
    console.log('4.父组件传递的属性有变化，做相应的响应');
  }
  shouldComponentUpdate(){
    // 组件是否需要更新，返回boole,优化点

    console.log('5.是否更新');
    return true
    
  }
  componentWillUpdate(){
    // 组件将要更新
    console.log('6.组件将要更新');
  }
  componentDidUpdate(){
    console.log('7.组件已经更新');
    
  }
  render() {
    console.log('组件渲染');
    
    return <div>组件生命周期

    </div>
  }
}
