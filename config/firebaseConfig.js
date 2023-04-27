import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDOYzrFZbgV_esj5GTGae57BTJZ9Mopg3c",
  authDomain: "datafirebase-a1747.firebaseapp.com",
  projectId: "datafirebase-a1747",
  storageBucket: "datafirebase-a1747.appspot.com",
  messagingSenderId: "45438180320",
  appId: "1:45438180320:web:86a7fee80063e1bca3e985"
};

// initialize firebase
initializeApp(firebaseConfig);
export const database = getFirestore();