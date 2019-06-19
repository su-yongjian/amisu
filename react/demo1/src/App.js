import React from 'react'
import imgCss from "./App.css"
function Welcome(props){
  return (
    <div>
      hello react {props.name}
    </div>
  )
}
class kaikebaCart extends React.Component{

  constructor(props){
    super(props)
    this.state={
      name:'开课吧',
      date:new Date()
    }
    setTimeout(()=>{
      this.setState({
        name:this.props.title
      })
    },2000)
  }
  // 组件挂载事件
  componentDidMount(){
    this.timer = setInterval(()=>{
      // 异步的
      this.setState({
        date:new Date()
      })
    })
  }
  componentWillUnmount(){
    clearInterval(this.timer)
    
  }
  formatName(user){
    return user.firstName + user.lastName ;
  }
  render(){
    const cname = 'jerry'
    const logo = 'jerry'
    const jsx = <p>jsx语句</p>
    return <div>
      {/* 表达式 */}
      
      <button>{this.state.name}</button>
      <h1>{cname}</h1>
      <h1>{this.formatName({firstName:'jerry',lastName:'tom'})}</h1>
      <img src={logo} alt="" style={{width:100,height:"100px"}} className="imgCss"></img>
      {jsx}
      {/* 使用组件 传值，传入的值是单向只读的*/}
      <Welcome name="tom"></Welcome>
      <div>{this.state.date}</div>
    </div>
  }
}

export default kaikebaCart