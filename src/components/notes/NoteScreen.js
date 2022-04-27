import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NotesAppBar } from './NotesAppBar';
import useForm from "../../hooks/useForm";

export const NoteScreen = () => {
	const { active: activeNote }                   = useSelector(state => state.notes);
	const [ formValues, handleInputChange, reset ] = useForm(activeNote);
	const { title, body }                          = formValues;
	
	useEffect(() => {
		reset(activeNote);
	}, [ activeNote ]);
	
	// @formatter:off
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
					activeNote.imageUrl && (
						<div className="notes__image">
							<img src={ activeNote.imageUrl } alt="imagen" />
						</div>
					)
				}
			</div>
		</div>
	);
};
