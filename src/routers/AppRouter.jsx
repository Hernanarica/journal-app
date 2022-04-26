import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { JournalScreen } from '../components/journal/JournalScreen';
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";
import { AuthRouter } from "./AuthRouter";
import PublicRoutes from "./publicRoutes";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../actions/authAction";

export const AppRouter = () => {
	const dispatch                  = useDispatch();
	const [ checking, setChecking ] = useState(true);
	const [ isAuth, setIsAuth ]     = useState(false);
	
	useEffect(() => {
		onAuthStateChanged(getAuth(), user => {
			if (user?.uid) {
				dispatch(login(user.uid, user.displayName));
				setIsAuth(true);
			} else {
				setIsAuth(false);
			}
			
			setChecking(false);
		});
	}, [ setIsAuth ]);
	
	if (checking) {
		return (
			<h1>Wait...</h1>
		);
	}
	
	return (
		<Router>
			<Routes>
				<Route path="/" element={ <AuthRouter isAuth={ isAuth }> <JournalScreen /> </AuthRouter> } />
				<Route path="/login" element={ <PublicRoutes isAuth={ isAuth }> <LoginScreen /> </PublicRoutes>  } />
				<Route path="/register" element={ <PublicRoutes isAuth={ isAuth }> <RegisterScreen /> </PublicRoutes> } />
			</Routes>
		</Router>
	);
};