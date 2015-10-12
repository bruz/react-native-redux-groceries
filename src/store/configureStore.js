const { createStore, applyMiddleware } = require('redux')
const thunk = require('redux-thunk')
const reducer = require('../reducers')

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore)

module.exports = function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState)
}
