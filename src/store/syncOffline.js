const offline = require('react-native-simple-store')

module.exports = function(store) {
  let currentItems

  store.subscribe(() => {
    const { offlineLoaded, offlineList } = store.getState().items

    if (offlineLoaded && currentItems != offlineList) {
      offline.save('items', offlineList)
      currentItems = offlineList
    }
  })
}
