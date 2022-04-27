import moment from "moment";
import { useDispatch } from "react-redux";
import { activeNote } from "../../actions/notesAction";

export const JournalEntry = ({ id, title, body, date, imageUrl }) => {
	const noteDate = moment(date);
	const dispatch = useDispatch();
	
	const handleEntryCLick = () => {
		dispatch(activeNote(id, { title, body, date, imageUrl }));
	};
	
	return (
		<div className="journal__entry pointer" onClick={ handleEntryCLick }>
			{
				imageUrl && <div className="journal__entry-picture" style={ {
					backgroundSize: 'cover',
					backgroundImage: `url(${ imageUrl })`
				} }></div>
			}
			<div className="journal__entry-body">
				<p className="journal__entry-title">
					{ title }
				</p>
				<p className="journal__entry-content">
					{ body }
				</p>
			</div>
			<div className="journal__entry-date-box">
				<span>{ noteDate.format('dddd') }</span>
				<h4>{ noteDate.format('Do') }</h4>
			</div>
		</div>
	);
};
