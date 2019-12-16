import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logoutUser } from '../actions/authedUser';
import PropTypes from 'prop-types';

const Logout = (props) => {
	const {dispatch} = props;
	dispatch(logoutUser());

	return (
		<Redirect to="/"/>
	)
};

Logout.propTypes = {
	// from connect
	dispatch: PropTypes.func.isRequired
};

export default connect()(Logout);