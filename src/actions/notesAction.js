import { collection, addDoc } from 'firebase/firestore';
import { db } from "../firebase/firebase.config";

export const startNewNote = () => {
	return async (dispatch, getState) => {
		try {
			const uid = getState().auth.uid;
			
			const newNote = {
				title: '',
				body: '',
				date: new Date().getTime()
			};
			
			const docRef = await addDoc(collection(db, `${ uid }/journal/notes`), newNote);
			console.log("Document written with ID: ", docRef);
		} catch (err) {
			console.error("Error adding document: ", err);
		}
	};
};