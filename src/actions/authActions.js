import { getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import types from "../types/types";
import { googleProvider } from "../firebase/firebase.config";

export const login = (uid, displayName) => ({
	type: types.login,
	payload: {
		uid,
		displayName
	}
});

export const startLoginEmailPassword = (email, password) => dispatch => {
	setTimeout(() => {
		dispatch(login('321', 'antonio'));
	}, 3500);
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