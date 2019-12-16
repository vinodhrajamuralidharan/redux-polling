import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import { Header, Tab, Message } from 'semantic-ui-react'
import PropTypes from 'prop-types';

class Dashboard extends Component {
	static propTypes = {
		// from connect
		dispatch: PropTypes.func.isRequired,
		// from mapStateToProps
		unansweredQuestionsIds: PropTypes.array.isRequired,
		answeredQuestionsIds: PropTypes.array.isRequired
	};

	render() {
		const {unansweredQuestionsIds, answeredQuestionsIds} = this.props;

		const panes = [
			{
				menuItem: 'Unanswered', render: () =>
					<Tab.Pane attached={false}>
						{unansweredQuestionsIds.length === 0 &&
						<Message
							icon='inbox'
							header='No Questions'
							content='You have answered all the questions'
						/>
						}
						{unansweredQuestionsIds.map((id) => <Question key={id} id={id}/>)}
					</Tab.Pane>
			},
			{
				menuItem: 'Answered', render: () =>
					<Tab.Pane attached={false}>
						{answeredQuestionsIds.length === 0 &&
						<Message
							icon='inbox'
							header='No Questions'
							content='You haven&#39;t answered any question'
						/>
						}
						{answeredQuestionsIds.map((id) => <Question key={id} id={id}/>)}
					</Tab.Pane>
			}
		];

		return (
			<div>
				<Header as='h2'>Dashboard</Header>
				<Tab menu={{secondary: true, pointing: true}} panes={panes}/>
			</div>
		)
	}
}

function mapStateToProps({questions, authedUser}) {
	const unansweredQuestionsIds = Object.keys(questions)
		.filter((i) => !questions[i].optionOne.votes.includes(authedUser) && !questions[i].optionTwo.votes.includes(authedUser))
		.sort((a, b) => questions[b].timestamp - questions[a].timestamp);

	const answeredQuestionsIds = Object.keys(questions)
		.filter((i) => questions[i].optionOne.votes.includes(authedUser) || questions[i].optionTwo.votes.includes(authedUser))
		.sort((a, b) => questions[b].timestamp - questions[a].timestamp);

	return {
		unansweredQuestionsIds,
		answeredQuestionsIds
	}
}

export default connect(mapStateToProps)(Dashboard);