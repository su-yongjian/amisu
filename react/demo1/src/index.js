import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import Lifecycle from './Lifecycle'
import TodeList from './components/TodoList'


ReactDom.render(<TodeList title="真不错"></TodeList>,document.querySelector("#root"))