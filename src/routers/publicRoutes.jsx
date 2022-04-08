import { Navigate } from "react-router-dom";

function PublicRoutes({ children }) {
	const isAuth = false;
	
	return isAuth
		? <Navigate to="/" />
		: (
			<div className="auth__main">
				<div className="auth__box-container">
					{ children }
				</div>
			</div>
		);
}

export default PublicRoutes;