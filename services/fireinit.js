import firebase from 'firebase'
import config from '@/config/private.json'

!firebase.apps.length ? firebase.initializeApp(config.fb) : ''
export const auth = firebase.auth()
export const DB = firebase.database()
export default firebase