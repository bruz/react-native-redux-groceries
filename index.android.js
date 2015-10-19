const React = require('react-native')
const { Provider } = require('react-redux/native')
const App = require('./src/containers/App')
const configureStore = require('./src/store/configureStore')

const {
  Component,
  AppRegistry
} = React

const store = configureStore()

class Groceries extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    )
  }
}

AppRegistry.registerComponent('Groceries', () => Groceries)
