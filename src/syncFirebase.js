import { firebaseApp, itemsRef } from './firebase'
import { addItemSuccess, removeItemSuccess, goOnline, goOffline } from './actions/items'

const connectedRef = firebaseApp.database().ref('.info/connected')

const syncFirebase = (store) => {
  itemsRef.on('child_added', (snapshot) => {
    store.dispatch(addItemSuccess(snapshot.val()))
  })

  itemsRef.on('child_removed', (snapshot) => {
    store.dispatch(removeItemSuccess(snapshot.val().id))
  })

  connectedRef.on('value', snap => {
    if (snap.val() === true) {
      store.dispatch(goOnline())
    } else {
      store.dispatch(goOffline())
    }
  })
}

export default syncFirebase;
