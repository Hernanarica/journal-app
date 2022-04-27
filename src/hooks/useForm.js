import { useState } from "react";

function useForm(initialState = {}) {
	const [ values, setValues ] = useState(initialState);
	
	const reset = (newInitialState = initialState) => {
		setValues(newInitialState);
	};
	
	const handleInputChange = ({ target }) => {
		setValues({
			...values,
			[target.name]: target.value
		});
	};
	
	return [ values, handleInputChange, reset ];
}

export default useForm;