import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import User from './User';
import { Header, Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Leaderboard = (props) => {
	const {usersIds} = props;

	return (
		<Fragment>
			<Header as='h2'>Leaderboard</Header>
			<p>&nbsp;</p>
			<Card.Group>
				{usersIds.map((id) => (
					<User key={id} id={id} isLeaderboard={true} />
				))}
			</Card.Group>
		</Fragment>
	)
};

Leaderboard.propTypes = {
	// from connect
	dispatch: PropTypes.func.isRequired,
	// from mapStateToProps
	usersIds: PropTypes.array.isRequired
};

function mapStateToProps({users})   {
	return {
		usersIds: Object.keys(users)
			.sort((a,b) => (Object.keys(users[b].answers).length + users[b].questions.length) - (Object.keys(users[a].answers).length + users[a].questions.length))
	};
}

export default connect(mapStateToProps)(Leaderboard);