import { Navigate } from 'react-router-dom';

export const AuthRouter = ({ children }) => {
	const isAuth = false;
	
	return isAuth ? children : <Navigate to="/login" />;
};

