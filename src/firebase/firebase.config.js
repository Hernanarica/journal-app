import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
	apiKey: "AIzaSyDYuUcrxf_g1nSCufz0e8J19rRGkdssBts",
	authDomain: "journal-2b566.firebaseapp.com",
	projectId: "journal-2b566",
	storageBucket: "journal-2b566.appspot.com",
	messagingSenderId: "267508075447",
	appId: "1:267508075447:web:9cb0bf2418082f06d6b632"
};

export const app            = initializeApp(firebaseConfig);
export const db             = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();