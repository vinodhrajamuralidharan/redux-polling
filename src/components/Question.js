import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleAddAnswer } from '../actions/questions';
import { camelize } from '../utils/helpers';
import { Card, Message, Icon, Feed, Grid, Segment, Divider, Button, Statistic } from 'semantic-ui-react'
import PropTypes from 'prop-types';

class Question extends Component {
	static propTypes = {
		// from connect
		id: PropTypes.string.isRequired,
		dispatch: PropTypes.func.isRequired,
		// from mapStateToProps
		question: PropTypes.object,
		author: PropTypes.object.isRequired,
		details: PropTypes.bool.isRequired,
		authedUser: PropTypes.string.isRequired,
		authedHasAnswered: PropTypes.string,
		stats: PropTypes.object.isRequired,
	};

	goToQuestionPage = (e, id) => {
		e.preventDefault();
		this.props.history.push(`/questions/${id}`);
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const {dispatch, question} = this.props;

		dispatch(handleAddAnswer(question.id, camelize(e.target.textContent)));
	};

	render() {
		const {question, author, authedUser, details, authedHasAnswered, stats} = this.props;

		return (
			<Card fluid color='teal'>
				<Card.Description>
					<Grid columns={2} relaxed>
						<Grid.Column>
							<Segment basic textAlign='center'>
								{question.optionOne.text}
							</Segment>
						</Grid.Column>
						<Divider vertical>Or</Divider>
						<Grid.Column>
							<Segment basic textAlign='center'>
								{question.optionTwo.text}
							</Segment>
						</Grid.Column>
					</Grid>
				</Card.Description>
				{details === false
					?
					<Card.Content>
						<Button fluid primary onClick={(e) => this.goToQuestionPage(e, question.id)}>{authedHasAnswered ?
							<span>Details</span> : <span>Vote</span>}</Button>
					</Card.Content>
					:
					<Fragment>
						{authedHasAnswered === null
							?
							<Card.Content className='center aligned'>
								<Button.Group>
									<Button color='teal' onClick={this.handleSubmit}>Option One</Button>
									<Button.Or/>
									<Button color='teal' onClick={this.handleSubmit}>Option Two</Button>
								</Button.Group>
							</Card.Content>
							:
							<Card.Content>
								<Message icon color='green'>
									<Icon name='thumbs up outline'></Icon>
									<Message.Content>
										<Message.Header>Well done!</Message.Header>
										You voted for the {authedHasAnswered}
									</Message.Content>
								</Message>
								<Statistic.Group widths='two'>
									<Statistic color={authedHasAnswered === 'Option One' ? 'green' : 'black'}>
										<Statistic.Value>{stats.percentVotesOptionOne}%</Statistic.Value>
										<Statistic.Label>voted by {stats.votesOptionOne} users</Statistic.Label>
									</Statistic>
									<Statistic color={authedHasAnswered === 'Option Two' ? 'green' : 'black'}>
										<Statistic.Value>{stats.percentVotesOptionTwo}%</Statistic.Value>
										<Statistic.Label>voted by {stats.votesOptionTwo} users</Statistic.Label>
									</Statistic>
								</Statistic.Group>
							</Card.Content>
						}
						<Card.Content extra>
							<Feed>
								<Feed.Event>
									<Feed.Label>
										<img src={author.avatarURL} alt={author.name}/>
									</Feed.Label>
									<Feed.Content>
										<Feed.Meta>
											Posted by <Feed.User>{author.name}{authedUser === author.id &&
										<span> (You)</span>}</Feed.User>
										</Feed.Meta>
									</Feed.Content>
								</Feed.Event>
							</Feed>
						</Card.Content>
					</Fragment>
				}
			</Card>
		)
	}
}

function mapStateToProps({questions, users, authedUser}, {id, details}) {
	const question = questions[id];

	const checkAuthedHasAnswered = () => {
		if(question.optionOne.votes.includes(authedUser))
			return 'Option One';
		else if (question.optionTwo.votes.includes(authedUser))
			return 'Option Two';
		else return null;
	};

	const createStats = () => {
		const votesOptionOne = question.optionOne.votes.length, votesOptionTwo = question.optionTwo.votes.length, votes = votesOptionOne + votesOptionTwo;
		const percentVotesOptionOne = parseInt((votesOptionOne * 100) / votes, 10), percentVotesOptionTwo = 100 - percentVotesOptionOne;
		return {
			votesOptionOne,
			votesOptionTwo,
			percentVotesOptionOne,
			percentVotesOptionTwo
		}
	};

	return {
		question: question || null,
		author: users[question.author],
		details: details !== undefined,
		authedUser,
		authedHasAnswered: checkAuthedHasAnswered(),
		stats: createStats()
	}
}

export default withRouter(connect(mapStateToProps)(Question));