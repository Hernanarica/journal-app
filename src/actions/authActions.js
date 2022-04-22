import { getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
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
	dispatch(startLoading());
	const { user } = await signInWithEmailAndPassword(getAuth(), email, password);
	dispatch(login(user.uid, user.displayName));
	dispatch(finishLoading());
};

export const startGoogleLogin = () => dispatch => {
	signInWithPopup(getAuth(), googleProvider).then(({ user }) => {
		dispatch(login(user.uid, user.displayName));
	}).catch((error) => {
		console.log(error);
	});
};

export const startRegisterWithEmailPasswordName = (email, password, name) => async dispatch => {
	const { user } = await createUserWithEmailAndPassword(getAuth(), email, password);
	await updateProfile(getAuth().currentUser, { displayName: name });
	dispatch(login(user.uid, user.displayName));
};