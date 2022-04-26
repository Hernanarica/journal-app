import { getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import Swal from "sweetalert2";
import types from "../types/types";
import { googleProvider } from "../firebase/firebase.config";
import { finishLoading, startLoading } from "./uiAction";

export const login = (uid, displayName) => ({
	type: types.login,
	payload: {
		uid,
		displayName
	}
});

export const startLoginEmailPassword = (email, password) => async dispatch => {
	try {
		dispatch(startLoading());
		const { user } = await signInWithEmailAndPassword(getAuth(), email, password);
		dispatch(login(user.uid, user.displayName));
		dispatch(finishLoading());
	} catch (err) {
		await Swal.fire('Error', err.message, 'error');
	}
};

export const startGoogleLogin = () => dispatch => {
	signInWithPopup(getAuth(), googleProvider).then(({ user }) => {
		dispatch(login(user.uid, user.displayName));
	}).catch((error) => {
		console.log(error);
	});
};

export const startRegisterWithEmailPasswordName = (email, password, name) => async dispatch => {
	try {
		const { user } = await createUserWithEmailAndPassword(getAuth(), email, password);
		await updateProfile(getAuth().currentUser, { displayName: name });
		dispatch(login(user.uid, user.displayName));
	} catch (err) {
		await Swal.fire('Error', err.message, 'error');
	}
};

export const startLogout = () => async dispatch => {
	await signOut(getAuth());
	
	dispatch(logout());
};

export const logout = () => ({
	type: types.logout
});