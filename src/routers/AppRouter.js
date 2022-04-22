import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { JournalScreen } from '../components/journal/JournalScreen';
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";
import { AuthRouter } from "./AuthRouter";
import PublicRoutes from "./publicRoutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../actions/authActions";

export const AppRouter = () => {
	const dispatch = useDispatch();
	
	useEffect(() => {
		onAuthStateChanged(getAuth(), user => {
			if (user?.uid) {
				dispatch(login(user.uid, user.displayName));
			}
		});
	}, []);
	
	return (
		// @formatter:off
		<Router>
			<Routes>
				<Route path="/" element={ <AuthRouter> <JournalScreen /> </AuthRouter> } />
				<Route path="/login" element={ <PublicRoutes> <LoginScreen /> </PublicRoutes>  } />
				<Route path="/register" element={ <PublicRoutes> <RegisterScreen /> </PublicRoutes> } />
			</Routes>
		</Router>
	);
};