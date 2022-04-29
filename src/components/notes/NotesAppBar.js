import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploading } from "../../actions/notesAction";

export const NotesAppBar = () => {
	const dispatch         = useDispatch();
	const { active: note } = useSelector(state => state.notes);
	
	const handleSave = () => {
		dispatch(startSaveNote(note));
	};
	
	const handlePictureClick = () => {
		document.getElementById('fileSelector').click();
	};
	
	const handleFileChange = ({ target }) => {
		const file = target.files[0];
		
		if (file) {
			dispatch(startUploading(file));
		}
	};
	
	return (
		<div className="notes__appbar">
			<span>28 de agosto 2020</span>
			<input type="file" name="file" id="fileSelector" style={ { display: 'none' } } onChange={ handleFileChange } />
			<div>
				<button className="btn" onClick={ handlePictureClick }>
					Picture
				</button>
				<button className="btn" onClick={ handleSave }>
					Save
				</button>
			</div>
		</div>
	);
};
