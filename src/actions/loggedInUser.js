import { LOGIN_USER, LOGOUT_USER } from './constants';

export function loginUser(id)   {
	return {
		type: LOGIN_USER,
		id
	}
}

export function logoutUser(id) {
	return {
		type: LOGOUT_USER
	}
}
