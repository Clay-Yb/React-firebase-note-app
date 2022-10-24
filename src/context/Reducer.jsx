export const Actions = {
	ModalOpen: 'modal_open',
	ModalClose: 'modal_close',
	UpdateUser: 'update_user',
	ReadData: 'read_data_db',
	ReadNotes: 'read_note_db',
	UserData: 'UserData',
	StepUpEdit: 'StepUpEdit',
	ResetEdit: 'ResetEdit',
};

export const Reducer = (state, action) => {
	switch (action.type) {
		case Actions.ModalOpen:
			return {
				...state,
				modal: true,
			};

		case Actions.ModalClose:
			return {
				...state,
				modal: false,
			};

		case Actions.UpdateUser:
			return {
				...state,
				user: action.payload,
			};

		case Actions.ReadData:
			return {
				...state,
				userInfo: action.payload[0],
			};

		case Actions.ReadNotes:
			return {
				...state,
				notes: action.payload,
			};

		case Actions.StepUpEdit:
			return {
				...state,
				modal: true,
				isEdit: true,
				editId: action.payload,
			};

		case Actions.ResetEdit:
			return {
				...state,
				isEdit: false,
				editId: null,
				modal: false,
			};

		default:
			return state;
	}
};
