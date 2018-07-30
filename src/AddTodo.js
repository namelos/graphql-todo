import React, { Component } from 'react'
import gql from 'graphql-tag'
import { connectMutation } from './helpers'
import { query } from './Todos'

const mutation = gql`
  mutation addTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
      completed
    }
  }
`

@connectMutation('addTodo', {
  document: mutation,
  updateQuery: query,
  updateCallbacks: {
    todos: (todos, addTodo) => todos.concat([addTodo])
  }
})
export class AddTodo extends Component {
  render() {
    const {addTodo} = this.props
    let input

    function handleClick(e) {
      e.preventDefault()
      if (!input.value) return
      addTodo({ variables: { text: input.value } })
      input.value = ''
    }

    return <div>
      <input type="text" ref={r => input = r} />
      <button onClick={handleClick}>Create</button>
    </div>
  }
}
