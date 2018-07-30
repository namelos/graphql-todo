import React, { Component } from 'react'
import gql from 'graphql-tag'
import { connectMutation } from './helpers'

const mutation = gql`
  mutation toggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      id
      text
      completed
    }
  }
`

@connectMutation('toggleTodo', mutation)
export class Todo extends Component {
  render() {
    const { id, text, completed, toggleTodo } = this.props
    return <li>
      <input type="checkbox"
             checked={completed}
             onChange={() => toggleTodo({ variables: { id } })} />
      <span>{text}</span>
    </li>
  }
}
