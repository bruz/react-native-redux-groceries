const { bindActionCreators } = require('redux')
const { connect } = require('react-redux/native')
const Groceries = require('../components/Groceries')
const ItemsActions = require('../actions/items')

function mapStateToProps(state) {
  return {
    onlineItems: state.items.onlineList,
    offlineItems: state.items.offlineList,
    connectionChecked: state.items.connectionChecked,
    connected: state.items.connected
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ItemsActions, dispatch)
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Groceries)
