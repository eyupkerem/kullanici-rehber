import { initializeApp } from "firebase/app"
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCevH8CzySpIzn5P1RO0FGeQGvfodr64kI",
    authDomain: "kullanici-rehber.firebaseapp.com",
    projectId: "kullanici-rehber",
    storageBucket: "kullanici-rehber.appspot.com",
    messagingSenderId: "869510903889",
    appId: "1:869510903889:web:db6918d4ed2ecda3b9e070",
    measurementId: "G-NT51YY7N6S"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore();