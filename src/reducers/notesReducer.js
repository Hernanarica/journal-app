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
		case types.noteUpdate:
			return {
				...state,
				notes: state.notes.map(note => note.id === action.payload.id ? action.payload.note : note)
			};
		case types.notesUpdate:
			return {
				...state,
				notes: state.notes.filter(note => note.id !== action.payload.id),
				active: null
			};
		case types.noteLogoutCleaning:
			return {
				...state,
				notes: [],
				active: null
			};
		case types.noteAddNew:
			return {
				...state,
				notes: [ action.payload, ...state.notes ]
			};
		
		default:
			return state;
	}
}

export default notesReducer;