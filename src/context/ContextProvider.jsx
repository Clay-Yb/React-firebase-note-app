import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import moment from 'moment/moment';

import React, { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import { auth, db } from '../firebase';
import { Actions, Reducer } from './Reducer';

const AppContext = createContext();

export const useGlobalContext = () => useContext(AppContext);

const inititalState = {
	modal: false,
	user: [],
	userInfo: [],
	notes: [],
	editId: null,
	isEdit: false,
};

const ContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(Reducer, inititalState);
	const titleRef = useRef();
	const desRef = useRef();

	const modalOpen = () => {
		dispatch({ type: Actions.ModalOpen });
	};

	const modalClose = () => {
		dispatch({ type: Actions.ModalClose });
	};

	const signUp = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logout = () => {
		return signOut(auth);
	};

	useEffect(() => {
		const mount = onAuthStateChanged(auth, (user) => {
			dispatch({ type: Actions.UpdateUser, payload: user });
		});
		return mount;
	}, []);

	useEffect(() => {
		onSnapshot(collection(db, 'users'), (snipShot) => {
			const userInfo = snipShot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));

			const formattedInfo = userInfo.map((item) => {
				const { id, email, firstName, secondName, day, month, year, gender } = item;
				const fullName = firstName + ' ' + secondName;
				const bod = `${day}-${month}-${year}`;
				return { id, email, fullName, bod, gender };
			});

			dispatch({ type: Actions.ReadData, payload: formattedInfo });
		});
	}, []);

	//read notes from db and save in state
	useEffect(() => {
		onSnapshot(collection(db, 'notes'), (snipShot) => {
			const notes = snipShot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			const formattedDate = notes.map((item) => {
				const { title, description, timeStamp, author, id } = item;
				const formatDate = moment(timeStamp?.seconds * 1000).format('MMMM Do YYYY, h:mm:ss A');
				return { title, description, formatDate, author, id };
			});
			dispatch({ type: Actions.ReadNotes, payload: formattedDate });
		});
	}, []);

	const handleDeleteNote = async (id) => {
		await deleteDoc(doc(db, 'notes', id));
	};

	const handleEditNote = (id) => {
		dispatch({ type: Actions.StepUpEdit, payload: id });
	};

	const handleReset = () => {
		dispatch({ type: Actions.ResetEdit });
	};

	return (
		<AppContext.Provider
			value={{
				...state,
				modalOpen,
				modalClose,
				signUp,
				login,
				logout,
				handleDeleteNote,
				handleEditNote,
				titleRef,
				desRef,
				handleReset,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default ContextProvider;
