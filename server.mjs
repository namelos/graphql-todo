const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config')
const { ApolloServer, gql } = require('apollo-server-express')
const uuid = require('uuid')

const todos = [
  { id: uuid(), text: 'Prepare slide', completed: true },
  { id: uuid(), text: 'Sleep', completed: true },
  { id: uuid(), text: 'Give the talk', completed: false }
]

const typeDefs = gql`
  type Query {
    todos: [Todo]
  }

  type Mutation {
    addTodo(text: String!): Todo
    toggleTodo(id: ID!): Todo
  }

  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
  }
`

const resolvers = {
  Query: {
    todos() { return todos }
  },
  Mutation: {
    addTodo(root, { text }) {
      const todo = { id: uuid(), text, completed: false }
      todos.push(todo)
      return todo
    },
    toggleTodo(root, { id }) {
      const todo = todos.find(t => t.id === id)
      todo.completed = !todo.completed
      return todo
    }
  }
}

const app = new express()
new ApolloServer({ typeDefs, resolvers }).applyMiddleware({ app, path: '/api' })
app.use(webpackDevMiddleware(webpack(webpackConfig), { publicPath: '/' }))
app.listen(4000, () => console.log(`🚀  Server ready on http://localhost:4000`))
