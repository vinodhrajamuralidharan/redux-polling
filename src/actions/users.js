import { saveUser } from '../utils/api';
import { loginUser } from './authedUser';
import { hideLoading, showLoading } from 'react-redux-loading';
import { ADD_USER, RECEIVE_USERS } from './types';

export function receiveUsers(users) {
	return {
		type: RECEIVE_USERS,
		users
	}
}

function addUser(user) {
	return {
		type: ADD_USER,
		user
	}
}

export function handleAddUser(params) {
	return (dispatch) => {

		dispatch(showLoading());

		return saveUser(params)
			.then((user) => {
				dispatch(addUser(user));
				dispatch(loginUser(user.id));
			})
			.then(() => dispatch(hideLoading()));
	}
}