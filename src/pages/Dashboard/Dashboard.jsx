import React, { useEffect, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import Navbar from '../../components/Navbar/Navbar';
import Note from '../../components/Note/Note';
import { useGlobalContext } from '../../context/ContextProvider';
import './Dashboard.scss';
const Dashboard = () => {
	const { modal, modalOpen, notes, user } = useGlobalContext();
	const [filterNotes, setFilterNotes] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setFilterNotes(notes.filter((item) => item.author === user.uid));
		setLoading(false);
	}, [user, notes]);

	if (loading) {
		return (
			<div className="dashboard_page">
				<Navbar />
				<h3>Loading...</h3>
			</div>
		);
	}

	return (
		<div className="dashboard_page">
			<Navbar />
			<div className="main_content">
				{modal ? <Modal /> : null}
				<div className="addnote_div">
					<button onClick={modalOpen}>
						<p>+</p>
						<span>Add a note</span>
					</button>
				</div>

				{filterNotes.map((item) => (
					<Note key={item.id} {...item} />
				))}
			</div>
		</div>
	);
};

export default Dashboard;
