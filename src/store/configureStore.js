import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'
import syncOffline from './syncOffline'

export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    applyMiddleware(thunk)
  )
  syncOffline(store)

  return store
}
