import { Navigate } from 'react-router-dom';

export const AuthRouter = ({ children, isAuth }) => {
	return isAuth ? children : <Navigate to="/login" />;
};