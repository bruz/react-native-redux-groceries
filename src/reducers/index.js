const { combineReducers } = require('redux')
const items = require('./items')

const rootReducer = combineReducers({
  items
})

module.exports = rootReducer
