import { getAuth, signInWithPopup } from 'firebase/auth';
import types from "../types/types";
import { provider } from "../firebase/firebase.config";

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
	signInWithPopup(getAuth(), provider).then(({ user }) => {
		dispatch(login(user.uid, user.displayName));
	}).catch((error) => {
		console.log(error);
	});
};