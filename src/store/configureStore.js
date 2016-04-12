const { createStore, applyMiddleware } = require('redux')
const thunk = require('redux-thunk').default
const reducer = require('../reducers')
const syncOffline = require('./syncOffline')

module.exports = function configureStore(initialState) {
  const store = createStore(
    reducer,
    applyMiddleware(thunk)
  )
  syncOffline(store)

  return store
}
