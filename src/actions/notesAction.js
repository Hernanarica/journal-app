import { collection, addDoc } from 'firebase/firestore';
import { db } from "../firebase/firebase.config";
import types from "../types/types";
import { loadNotes } from "../helpers/loadNotes";

export const startNewNote = () => async (dispatch, getState) => {
	try {
		const uid = getState().auth.uid;
		
		const newNote = {
			title: '',
			body: '',
			imageUrl: '',
			date: new Date().getTime()
		};
		
		const docRef = await addDoc(collection(db, `${ uid }/journal/notes`), newNote);
		
		dispatch(activeNote(docRef.id, newNote));
	} catch (err) {
		console.error("Error adding document: ", err);
	}
};

export const activeNote = (id, note) => ({
	type: types.noteActive,
	payload: { id, ...note }
});

export const setNotes = (notes) => ({
	type: types.noteAdd,
	payload: notes
});

export const startLoadingNotes = uid => async dispatch => {
	const notes = await loadNotes(uid);
	
	dispatch(setNotes(notes));
};