import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Login from './Login';
import PropTypes from 'prop-types';

const PrivateRoute = ({component: Component, ...props}) => {
	const isUserAuthed = () => {
		const {authedUser} = props;
		return authedUser !== null;
	};

	return (
		<Route {...props} render={(p) => (
			<Fragment>
				{isUserAuthed() ? <Component {...p} /> : <Login/>}
			</Fragment>
		)}/>
	)
};

PrivateRoute.propTypes = {
	// from connect
	dispatch: PropTypes.func.isRequired,
	// from mapStateToProps
	authedUser: PropTypes.string
};

function mapStateToProps({authedUser}) {
	return {
		authedUser
	}
}

export default connect(mapStateToProps)(PrivateRoute);