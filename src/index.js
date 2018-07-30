import React from 'react'
import { render } from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { TodoApp } from './Todo'

const client = new ApolloClient({ uri: '/api' })

render(<ApolloProvider client={client}>
  <TodoApp />
</ApolloProvider>, document.body)

