import React, { Component } from 'react'
import {
  ListView,
  NetInfo,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import { initializeApp } from 'firebase'
import config from '../../config'
import Item from './Item'

const firebaseApp = initializeApp({
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  databaseURL: config.DATABASE_URL,
  storageBucket: config.STORAGE_BUCKET
})
const itemsRef = firebaseApp.database().ref('items')
const connectedRef = firebaseApp.database().ref('.info/connected')

export default class Groceries extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newItem: ''
    }
  }

  componentWillMount() {
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    this.props.loadOfflineItems()

    itemsRef.on('child_added', (snapshot) => {
      this.props.addItem(snapshot.val())
    })

    itemsRef.on('child_removed', (snapshot) => {
      this.props.removeItem(snapshot.val().id)
    })

    if (NetInfo) {
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
  }

  renderRow(rowData) {
    console.log(this.props.connected)
    return (
      <Item name={rowData.title}
            removable={this.props.connected}
            onRemove={() => this._remove(rowData.id)} />
    )
  }

  _add() {
    const id = Math.random().toString(36).substring(7)
    const itemRef = itemsRef.child(id)

    itemRef.set({
      id,
      title: this.state.newItem,
      time: new Date().getTime()
    })

    this.setState({newItem: ''})

    setTimeout(() => this.refs.newItem.focus(), 1)
  }

  _remove(id) {
    itemsRef.child(id).remove()
  }

  render() {
    console.log('PROPS!')
    console.log(this.props)
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
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#F6F6F6'
  },
  newItem: {
    backgroundColor: '#FFFFFF',
    height: 42,
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
