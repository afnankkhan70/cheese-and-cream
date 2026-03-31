import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyDFwy-3wUqMS3IJazIJNHhJfsSNE7gTSrI",
  authDomain: "cheesencream-14ffe.firebaseapp.com",
  projectId: "cheesencream-14ffe",
  storageBucket: "cheesencream-14ffe.firebasestorage.app",
  messagingSenderId: "910672876896",
  appId: "1:910672876896:web:6df1d490f23ef770d4fa05"
}
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
