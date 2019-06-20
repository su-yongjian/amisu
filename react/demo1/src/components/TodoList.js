import React ,{Component} from 'react' ;
class TodoList extends Component {
  constructor(props){
    super(props)
    this.state = {
      inval:'',
      list:['学习html','css']
    }
  }
  handleChange(e){
    this.setState({
      inval:e.target.value
    })
  }
  handleClickAdd(){
    
    this.setState({
      list:[...this.state.list,this.state.inval],
      inval:''
    })
  }
  handleDel(i){
    console.log(i);
    let _list = this.state.list
    _list.splice(i,1)
    this.setState({
      list:_list
    })
  }
  render(){
    return (
      <div>
        <div>
          <input value={this.state.inval} onChange={this.handleChange.bind(this)}
           ></input><button onClick={this.handleClickAdd.bind(this)}>提交</button>
        </div>
        <ul>
          {
            this.state.list.map((it,i)=>{
              return  <li key={i}>{it} <span onClick={this.handleDel.bind(this,i)} >删除</span></li>
            })
          }
         
          
        </ul>
      </div>
    )
  }
}
export default TodoList;