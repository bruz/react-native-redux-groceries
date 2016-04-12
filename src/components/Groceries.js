const React = require('react-native')
const {
  StyleSheet,
  ListView,
  NetInfo,
  Text,
  TextInput,
  View
} = React
const Firebase = require('firebase')
const config = require('../../config')
const Item = require('./Item')

const itemsRef = new Firebase(`${ config.FIREBASE_ROOT }/items`)
const connectedRef = new Firebase(`${ config.FIREBASE_ROOT }/.info/connected`)

const Groceries = React.createClass({
  getInitialState: function() {
    return {
      newItem: ''
    }
  },

  componentWillMount: function() {
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    this.props.loadOfflineItems()

    itemsRef.on('child_added', (snapshot) => {
      this.props.addItem(snapshot.val())
    })

    itemsRef.on('child_removed', (snapshot) => {
      this.props.removeItem(snapshot.val().id)
    })

    if (React.NativeModules.NetInfo) {
      NetInfo.isConnected.fetch().done(isConnected => {
        if (isConnected) {
          this.props.checkConnection()
        } else {
          this.props.goOffline()
        }
      })
    } else {
      this.props.checkConnection()
    }

    connectedRef.on('value', snap => {
      if (snap.val() === true) {
        this.props.goOnline()
      } else {
        this.props.goOffline()
      }
    })
  },

  renderRow: function(rowData) {
    return (
      <Item name={rowData.title}
            removable={this.props.connected}
            onRemove={() => this._remove(rowData.id)} />
    )
  },

  _add: function() {
    const id = Math.random().toString(36).substring(7)
    const itemRef = itemsRef.child(id)

    itemRef.set({
      id,
      title: this.state.newItem,
      time: new Date().getTime()
    })

    this.setState({newItem: ''})

    setTimeout(() => this.refs.newItem.focus(), 1)
  },

  _remove: function(id) {
    itemsRef.child(id).remove()
  },

  render: function() {
    let items, readonlyMessage
    if (this.props.connected) {
      items = this.props.onlineItems
    } else if (this.props.connectionChecked) {
      items = this.props.offlineItems
      readonlyMessage = <Text style={styles.offline}>Offline</Text>
    } else {
      items = []
      readonlyMessage = <Text style={styles.offline}>Loading...</Text>
    }

    return (
      <View style={styles.container}>
        {readonlyMessage}
        <TextInput placeholder="Something delicious"
                   style={styles.newItem}
                   ref="newItem"
                   editable={this.props.connected}
                   value={this.state.newItem}
                   onChangeText={(newItem) => this.setState({newItem})}
                   onSubmitEditing={() => this._add()} />


        <ListView
          dataSource={this.dataSource.cloneWithRows(items)}
          enableEmptySections={true}
          renderRow={this.renderRow}
        />
      </View>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#F6F6F6'
  },
  newItem: {
    backgroundColor: '#FFFFFF',
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: 20
  },
  offline: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    paddingTop: 5,
    paddingBottom: 5
  }
})

module.exports = Groceries
