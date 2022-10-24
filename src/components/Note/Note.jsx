import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { useGlobalContext } from '../../context/ContextProvider';

import './Note.scss';
const Note = ({ id, title, description, formatDate }) => {
	const { handleDeleteNote, handleEditNote } = useGlobalContext();
	return (
		<div className="note">
			<div className="note_header">
				<h4>{title}</h4>
				<hr />
			</div>
			<div className="note_middle">
				<p>{description}</p>
			</div>
			<div className="note_footer">
				<hr />
				<div className="footer_div">
					<span>{formatDate}</span>
					<div className="dropdown_container">
						<button className="dots">
							<BiDotsHorizontalRounded />
						</button>
						<div className="dropdown">
							<button onClick={() => handleEditNote(id)}>
								<AiOutlineEdit />
								Edit
							</button>

							<button onClick={() => handleDeleteNote(id)}>
								<AiOutlineDelete />
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Note;
