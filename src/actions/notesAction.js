import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from "../firebase/firebase.config";
import Swal from "sweetalert2";
import types from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import { fileUpload } from "../helpers/fileUpload";

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

export const startSaveNote = note => async (dispatch, getState) => {
	const { uid } = getState().auth;
	
	const noteToFirestore = { ...note };
	delete noteToFirestore.id;
	if (!noteToFirestore.imageUrl) {
		delete noteToFirestore.imageUrl;
	}
	
	const docRef = doc(db, `${ uid }/journal/notes`, `${ note.id }`);
	await updateDoc(docRef, noteToFirestore);
	
	dispatch(refreshNote(note.id, noteToFirestore));
	
	Swal.fire('Saved', noteToFirestore.title, 'success');
};

export const refreshNote = (id, note) => ({
	type: types.noteUpdate,
	payload: {
		id,
		note: { ...note, id }
	}
});


export const startUploading = file => async (dispatch, getState) => {
	const { active: note } = getState().notes;
	
	Swal.fire({
		title: 'Uploading...',
		text: 'Please wait...',
		didOpen() {
			Swal.showLoading();
		}
	});
	
	const fileUrl = await fileUpload(file);
	note.imageUrl = fileUrl;
	
	dispatch(startSaveNote(note));
	
	Swal.close();
};