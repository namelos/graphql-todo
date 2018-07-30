import React, { Component } from 'react'
import gql from 'graphql-tag'
import { connectQuery } from './helpers'
import { Todo } from './Todo'

export const query = gql`
  {
    todos {
      id
      text
      completed
    }
  }
`

@connectQuery(query)
export class Todos extends Component {
  render() {
    return this.props.data.todos.map(todo => <Todo {...todo} key={todo.id} />)
  }
}
