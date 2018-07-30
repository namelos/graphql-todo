import React, { Component } from 'react'
import gql from 'graphql-tag'
import { connectQuery, connectMutation } from './helpers'

export class TodoApp extends Component {
  render() {
    return <div>
      <Todos />
      <AddTodo />
    </div>
  }
}

const query = gql`
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

@connectMutation('toggleTodo', gql`
  mutation toggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      id
      text
      completed
    }
  }
`)
class Todo extends Component {
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


@connectMutation('addTodo', {
  document: gql`
    mutation addTodo($text: String!) {
      addTodo(text: $text) {
        id
        text
        completed
      }
    }
  `,
  updateQuery: query,
  updateCallbacks: {
    todos: (todos, addTodo) => todos.concat([addTodo])
  }
})
class AddTodo extends Component {
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
