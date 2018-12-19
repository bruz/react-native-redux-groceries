import { initializeApp } from 'firebase'

import config from '../config'

export const firebaseApp = initializeApp(config)
export const itemsRef = firebaseApp.database().ref('items')
