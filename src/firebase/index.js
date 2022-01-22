import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC0ccRfmhSYsp4W3cSRGGcrlnPkqbOU7jA",
  authDomain: "game-24c03.firebaseapp.com",
  projectId: "game-24c03",
  storageBucket: "game-24c03.appspot.com",
  messagingSenderId: "626787281232",
  appId: "1:626787281232:web:6f43f74ce63ab718492455",
  measurementId: "G-QQPWMWWL4S"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
