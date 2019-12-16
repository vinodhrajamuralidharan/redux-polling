import { ADD_QUESTION, ADD_QUESTION_ANSWER, ADD_USER, RECEIVE_USERS } from '../actions/types';

export default function users(state = {}, action) {
	switch (action.type) {
		case RECEIVE_USERS:
			return {
				...state,
				...action.users
			};
		case ADD_USER:
			return {
				...state,
				[action.user.id]: action.user
			};
		case ADD_QUESTION:
			return {
				...state,
				[action.question.author]: {
					...state[action.question.author],
					questions: state[action.question.author].questions.concat([action.question.id])
				}
			};
		case ADD_QUESTION_ANSWER:
			const {qid, answer, authedUser} = action;

			return {
				...state,
				[authedUser]: {
					...state[authedUser],
					answers: {
						...state[authedUser].answers,
						[qid]: answer
					}
				}

			};
		default:
			return state;
	}
}