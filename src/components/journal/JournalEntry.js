import moment from "moment";

export const JournalEntry = ({ id, title, body, date, imageUrl }) => {
	const noteDate = moment(date);
	
	return (
		<div className="journal__entry pointer">
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
