import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import React from 'react';
import { GrFormClose } from 'react-icons/gr';
import { useGlobalContext } from '../../context/ContextProvider';
import { db } from '../../firebase';
import './Modal.scss';

const Modal = () => {
	const { modalClose, user, isEdit, titleRef, desRef, editId, handleReset } = useGlobalContext();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!titleRef.current.value || !desRef.current.value) {
			return;
		}

		if (titleRef.current.value && desRef.current.value && isEdit) {
			await updateDoc(doc(db, 'notes', editId), {
				title: titleRef.current.value,
				description: desRef.current.value,
				timeStamp: serverTimestamp(),
			});
			handleReset();
			return;
		}

		modalClose();
		await addDoc(collection(db, 'notes'), {
			title: titleRef.current.value,
			description: desRef.current.value,
			author: user?.uid,
			timeStamp: serverTimestamp(),
		});
	};

	return (
		<div className="modal_container">
			<div className="modal">
				<div className="top">
					<h3>Add a note</h3>
					<button className="close" onClick={modalClose}>
						<GrFormClose />
					</button>
				</div>

				<hr />

				<form onSubmit={handleSubmit}>
					<div className="form_control">
						<label htmlFor="title">Title</label>
						<input type="text" autoComplete="off" id="title" ref={titleRef} />
					</div>

					<div className="form_control">
						<label htmlFor="des">Description</label>
						<textarea name="des" id="des" ref={desRef} />
					</div>
					<div className="btn">
						<button>Add a note</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Modal;
