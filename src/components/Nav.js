import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { Menu, Image, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';


const Nav = (props) => {
	return (
		<Menu stackable>
			<Menu.Item as={NavLink} to='/' exact activeClassName='active'>
				<Icon name='home' />
				Home
			</Menu.Item>
			<Menu.Item as={NavLink} to='/leaderboard' activeClassName='active'>
				<Icon name='dashboard' />
				Leaderboard
			</Menu.Item>
			<Menu.Item as={NavLink} to='/add' activeClassName='active'>
				<Icon name='plus circle' />
				Add Question
			</Menu.Item>
			<Menu.Menu position='right'>
				{props.loggedInUser !== null &&
				<Fragment>
					<Menu.Item>
						<Fragment>
							<Image src={props.loggedInUser.avatarURL} size='mini' avatar circular/>
							<span>{props.loggedInUser.name}</span>
						</Fragment>
					</Menu.Item>
					<Menu.Item as={NavLink} to='/logout' activeClassName='active'>
						<Icon name='sign out' />
						Logout
					</Menu.Item>
				</Fragment>
				}
			</Menu.Menu>
		</Menu>
	)
};

Nav.propTypes = {
	// from connect
	dispatch: PropTypes.func.isRequired,
	// from mapStateToProps
	loggedInUser: PropTypes.object
};

function mapStateToProps({loggedInUser, users}) {
	return {
		loggedInUser: loggedInUser === null ? null : {
			...users[loggedInUser]
		}
	}
}

export default withRouter(connect(mapStateToProps)(Nav));