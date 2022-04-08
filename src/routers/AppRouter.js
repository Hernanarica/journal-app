import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { JournalScreen } from '../components/journal/JournalScreen';
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";
import { AuthRouter } from "./AuthRouter";
import PublicRoutes from "./publicRoutes";

export const AppRouter = () => {
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