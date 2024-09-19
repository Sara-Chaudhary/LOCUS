// FIREBASE CONFIGURATION

import {initializeApp} from "firebase/app";
import { getAuth,initializeAuth , getReactNativePersistence} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import  {ReactNativeAsyncStorage}from '@react-native-async-storage/async-storage'

//  web config
const firebaseConfig = {
    apiKey: "AIzaSyBTbGaaIlLcBQhxBNH7BlMKAQMzvwtmSOE",
    authDomain: "level-array-420211.firebaseapp.com",
    projectId: "level-array-420211",
    storageBucket: "level-array-420211.appspot.com",
    messagingSenderId: "500889437259",
    appId: "1:500889437259:web:2867311267fd07cf3d79ce",
    measurementId: "G-Y2PMNBRY5Y"
}

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app , {persistence: getReactNativePersistence(ReactNativeAsyncStorage)});
const db = getFirestore(app);
export { auth , db};
  