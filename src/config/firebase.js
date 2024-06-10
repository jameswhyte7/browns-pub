import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeIwFUwXFdavDltxpM46cu74dna0q_5D4",
  authDomain: "browns-kitchen-6e202.firebaseapp.com",
  projectId: "browns-kitchen-6e202",
  storageBucket: "browns-kitchen-6e202.appspot.com",
  messagingSenderId: "1045313144320",
  appId: "1:1045313144320:web:a2ee0d7713a26adf4e3ae5"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
