import types from "../types/types";

const initialState = {
	notes: [],
	active: null
};

/*{
	notes: [],
	active: null,
	active: {
		id: ,
		title: ,
		body: ,
		imageUrl: ,
		date: ,
	}
}*/

function notesReducer(state = initialState, action) {
	switch (action.type) {
		case types.noteActive:
			return {
				...state,
				active: {
					...action.payload
				}
			};
		case types.noteAdd:
			return {
				...state,
				notes: [ ...action.payload ]
			};
		
		default:
			return state;
	}
}

export default notesReducer;