import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: 'noteapp-569cc.firebaseapp.com',
	projectId: 'noteapp-569cc',
	storageBucket: 'noteapp-569cc.appspot.com',
	messagingSenderId: '860750256990',
	appId: '1:860750256990:web:91c42a0cd20e81f9880dcf',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
