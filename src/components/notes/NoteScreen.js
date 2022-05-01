import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotesAppBar } from './NotesAppBar';
import useForm from "../../hooks/useForm";
import { activeNote, startDeleting } from "../../actions/notesAction";

export const NoteScreen = () => {
	const dispatch                                 = useDispatch();
	const { active: note }                         = useSelector(state => state.notes);
	const [ formValues, handleInputChange, reset ] = useForm(note);
	const { title, body }                          = formValues;
	
	useEffect(() => {
		reset(note);
	}, [ note ]);
	
	useEffect(() => {
		(formValues !== note) && dispatch(activeNote(formValues.id, { ...formValues }));
	}, [ formValues ]);
	
	const handleDelete = () => {
		dispatch(startDeleting(formValues.id));
	};
	
	return (
		<div className="notes__main-content">
			<NotesAppBar />
			<div className="notes__content">
				<input type="text"
				       placeholder="Some awesome title"
				       className="notes__title-input"
				       autoComplete="off"
				       name="title"
				       value={ title }
				       onChange={ handleInputChange }
				/>
				<textarea placeholder="What happened today"
				          name="body"
				          className="notes__textarea"
				          onChange={ handleInputChange }
				          value={ body }
				></textarea>
				{
					note.imageUrl && (
						<div className="notes__image">
							<img src={ note.imageUrl } alt="imagen" />
						</div>
					)
				}
			</div>
			<button className="btn btn-danger" onClick={ handleDelete }>Delete</button>
		</div>
	);
};
