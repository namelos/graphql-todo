import React, { Component } from 'react'
import { Todos } from './Todos'
import { AddTodo } from './AddTodo'

export class TodoApp extends Component {
  render() {
    return <div>
      <Todos />
      <AddTodo />
    </div>
  }
}




