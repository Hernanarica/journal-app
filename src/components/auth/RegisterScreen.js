import React from 'react';
import validator from "validator";
import { Link } from 'react-router-dom';
import useForm from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { removeError, setError } from "../../actions/uiAction";

export const RegisterScreen = () => {
	const dispatch                                 = useDispatch();
	const [ formValues, handleInputChange, reset ] = useForm({
		name: '',
		email: '',
		password: '',
		passwordConfirmed: ''
	});
	
	const { name, email, password, passwordConfirmed } = formValues;
	
	const handleRegister = e => {
		e.preventDefault();
		
		if (isFormValid()) {
			console.log('Formulario correcto');
			reset();
		} else {
			console.log('Formulario incorrecto');
		}
		
	};
	
	const isFormValid = () => {
		if (name.trim().length === 0) {
			dispatch(setError('Name is required'));
			return false;
		} else if (!validator.isEmail(email)) {
			dispatch(setError('Email is not valid'));
			return false;
		} else if (password !== passwordConfirmed || password < 5) {
			dispatch(setError('Email should be at least 6 characters and match each other!'));
			return false;
		}
		
		dispatch(removeError());
		return true;
	};
	
	return (
		// @formatter:off
		<>
			<h3 className="auth__title">Register</h3>
			<form onSubmit={ handleRegister }>
				<div className="auth__alert-error">Hola mundo</div>
				<input type="text"
				       placeholder="Name"
				       name="name"
				       className="auth__input"
				       autoComplete="off"
				       value={ name }
				       onChange={ handleInputChange }
				/>
				<input type="text"
				       placeholder="Email"
				       name="email"
				       className="auth__input"
				       autoComplete="off"
				       value={ email }
				       onChange={ handleInputChange }
				/>
				<input type="password"
				       placeholder="Password"
				       name="password"
				       className="auth__input"
				       value={ password }
				       onChange={ handleInputChange }
				/>
				<input type="password"
				       placeholder="Confirm password"
				       name="passwordConfirmed"
				       className="auth__input"
				       value={ passwordConfirmed }
				       onChange={ handleInputChange }
				/>
				<button type="submit" className="btn btn-primary btn-block mb-5">
					Register
				</button>
				<Link to="/login" className="link"> Already registered? </Link>
			</form>
		</>
	);
};
