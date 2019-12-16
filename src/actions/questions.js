import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';
import { ADD_QUESTION, ADD_QUESTION_ANSWER, RECEIVE_QUESTIONS } from './types';

export function receiveQuestions(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions
	}
}

export function handleAddQuestion(params) {
	return (dispatch, getState) => {
		const {authedUser} = getState();
		const {optionOneText, optionTwoText} = params;

		dispatch(showLoading());

		return saveQuestion({author: authedUser, optionOneText, optionTwoText})
			.then((question) => dispatch(addQuestion(question)))
			.then(() => dispatch(hideLoading()))
	}
}

function addQuestion(question) {
	return {
		type: ADD_QUESTION,
		question
	}
}

export function handleAddAnswer(qid, answer)  {
	return (dispatch, getState) => {
		const {authedUser} = getState();
		const info = {qid, answer, authedUser};

		dispatch(addQuestionAnswer(info));

		return saveQuestionAnswer(info)
			.catch((e) => {
				console.warn('Error', e);
				dispatch(addQuestionAnswer(info));
				alert('There was an error linking the tweet. Try again.');
			})
	}
}

export function addQuestionAnswer({authedUser, qid, answer}) {
	return {
		type: ADD_QUESTION_ANSWER,
		authedUser,
		qid,
		answer
	}
}

