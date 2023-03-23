import {initializeApp} from 'firebase/app';
import { getStorage } from 'firebase/storage';
import {getFirestore, getDocs, collection, addDoc} from 'firebase/firestore';



const firebaseApp = {
    apiKey: "AIzaSyDBgAv_P7Y7XNiPUW95Dss_vrU0K34h7Pk",
    authDomain: "rrmultimarcas-5a37b.firebaseapp.com",
    projectId: "rrmultimarcas-5a37b",
    storageBucket: "rrmultimarcas-5a37b.appspot.com",
    messagingSenderId: "633943598664",
    appId: "1:633943598664:web:34049975c1b2cd7306da7d",
    measurementId: "G-Y0WC8391Y9"
  };


  export const app = initializeApp(firebaseApp);
  export const storage = getStorage(app);
  export const db = getFirestore(app)