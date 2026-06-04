import app from "firebase/app"
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyBFf4Ahj-nvX1ombwyDPkbfb6_2kQSQ5mk",
  authDomain: "proyecto-integrador-fire-e3432.firebaseapp.com",
  projectId: "proyecto-integrador-fire-e3432",
  storageBucket: "proyecto-integrador-fire-e3432.firebasestorage.app",
  messagingSenderId: "438911900554",
  appId: "1:438911900554:web:68d95703112a9758454673"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = app.firestore()
export const storage = app.storage();

