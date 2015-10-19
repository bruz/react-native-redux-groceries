var offline = require('react-native-simple-store')

var actions = exports = module.exports

exports.ADD_ITEM = 'ADD_ITEM'
exports.REMOVE_ITEM = 'REMOVE_ITEM'
exports.OFFLINE_ITEMS_LOADED = 'OFFLINE_ITEMS_LOADED'
exports.CONNECTION_CHECKING = 'CONNECTION_CHECKING'
exports.CONNECTION_CHECKED = 'CONNECTION_CHECKED'
exports.CONNECTION_ONLINE = 'CONNECTION_ONLINE'
exports.CONNECTION_OFFLINE = 'CONNECTION_OFFLINE'

exports.addItem = function addItem(itemData) {
  return {
    type: actions.ADD_ITEM,
    itemData: itemData
  }
}

exports.removeItem = function removeItem(id) {
  return {
    type: actions.REMOVE_ITEM,
    id: id
  }
}

function offlineItemsLoaded(items) {
  return {
    type: actions.OFFLINE_ITEMS_LOADED,
    items: items
  }
}

exports.loadOfflineItems = function loadOfflineItems() {
  return dispatch => {
    offline.get('items').then(items => {
      dispatch(offlineItemsLoaded(items || []))
    })
  }
}

exports.checkConnection = function checkConnection() {
  return dispatch => {
    dispatch({type: actions.CONNECTION_CHECKING})
    setTimeout(() => dispatch({type: actions.CONNECTION_CHECKED}), 5000)
  }
}

exports.goOnline = function goOnline() {
  return {
    type: actions.CONNECTION_ONLINE
  }
}

exports.goOffline = function goOffline() {
  return {
    type: actions.CONNECTION_OFFLINE
  }
}
