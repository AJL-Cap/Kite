import firebase from 'firebase'
import fbConfig from '../secrets'

const fire = firebase.initializeApp(fbConfig)

export default fire
