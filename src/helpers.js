import React from 'react'
import { Query, Mutation } from 'react-apollo'

function isGraphqlDocument(obj) {
  if (!obj) return false
  return obj.kind === 'Document' && Array.isArray(obj.definitions)
}

export const connectQuery = query => Comp => () => <Query query={query}>
  {({ loading, data }) => loading ? <p>loading...</p> : <Comp data={data} />}
</Query>

export const connectMutation = (mutationKey, mutation) => Comp => props => {
  let mutationDocument, update

  if (!mutation) throw new Error('Need to pass in document')

  if (isGraphqlDocument(mutation)) {
    mutationDocument = mutation
  }

  if (isGraphqlDocument(mutation.document) &&
    isGraphqlDocument(mutation.updateQuery) &&
    mutation.updateCallbacks) {
    mutationDocument = mutation.document
    update = decorateUpdate(mutationKey, mutation)
  }

  return <Mutation mutation={mutationDocument} update={update}>
    {mutationCallback => <Comp {...props} {...{[mutationKey]: mutationCallback}} />}
  </Mutation>
}

function decorateUpdate(mutationKey, { updateQuery, updateCallbacks }) {
  return (cache, { data: mutationData }) => {
    const data = cache.readQuery({ query: updateQuery })

    const result = {}

    Object.keys(data).forEach(key => {
      const reducer = updateCallbacks[key] || (x => x)
      result[key] = reducer(data[key], mutationData[mutationKey])
    })

    cache.writeQuery({
      query: updateQuery,
      data: result
    })
  }
}
