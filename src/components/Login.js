import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import User from './User';
import ImageInput from './ImageInput';
import { handleAddUser } from '../actions/users';
import { Header, Card, Divider, Form, Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types';

class Login extends Component {
	static propTypes = {
		// from connect
		dispatch: PropTypes.func.isRequired,
		// from mapStateToProps
		usersIds: PropTypes.array.isRequired
	};

	state = {
		avatarURL: 'https://www.avatarys.com/var/albums/Cool-Avatars/Cartoons-Avatars/funny-avatar_by-avatarys_cartoon-avatar-by-avatarys.jpg?m=1432822352',
		name: ''
	};

	handleChanges = (e, {name, value}) => {
		this.setState({
			[name]: value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const {avatarURL, name} = this.state;
		const {dispatch} = this.props;

		dispatch(handleAddUser({avatarURL, name}));
	};

	render() {
		const {usersIds} = this.props;
		const {name} = this.state;

		return (
			<Fragment>
				<Header as='h1'>Login Required</Header>
				<Header as='h3'>Please, select a user to login</Header>
				<p>Only logged users can vote, submit new questions or view leaderboards.</p>
				<p>&nbsp;</p>
				<Card.Group>
					{usersIds.map((id) => (
						<User key={id} id={id} isLeaderboard={false}/>
					))}
				</Card.Group>
				<p>&nbsp;</p>
				<Divider horizontal>Or</Divider>
				<Header as='h3'>Create a new user</Header>
				<Form onSubmit={this.handleSubmit}>
					<Grid stackable columns={3}>
						<Grid.Column>
							<Form.Field>
								<label>Select Avatar</label>
								<ImageInput className='uploadAvatar' name='avatarURL' handleChanges={this.handleChanges} />
							</Form.Field>
						</Grid.Column>
						<Grid.Column>
							<Form.Input fluid label='Name' placeholder='Name' name='name' value={name} onChange={this.handleChanges} />
						</Grid.Column>
						<Grid.Column>
							<Form.Button fluid label='Sign Up' disabled={name === ''}>Sign Up</Form.Button>
						</Grid.Column>
					</Grid>
				</Form>
			</Fragment>
		)
	}
}

function mapStateToProps({users}) {
	return {
		usersIds: Object.keys(users)
			.sort((a, b) => (Object.keys(users[b].answers).length + users[b].questions.length) - (Object.keys(users[a].answers).length + users[a].questions.length))
	}
}

export default connect(mapStateToProps)(Login);