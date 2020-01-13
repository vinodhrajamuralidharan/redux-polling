import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';
import { ADD_QUESTION, ADD_QUESTION_ANSWER, RECEIVE_QUESTIONS } from './constants';

export function receiveQuestions(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions
	}
}

export function handleAddQuestion(params) {
	return (dispatch, getState) => {
		const {loggedInUser} = getState();
		const {optionOneText, optionTwoText} = params;

		dispatch(showLoading());

		return saveQuestion({author: loggedInUser, optionOneText, optionTwoText})
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
		const {loggedInUser} = getState();
		const info = {qid, answer, loggedInUser};

		dispatch(addQuestionAnswer(info));

		return saveQuestionAnswer(info)
			.catch((e) => {
				console.warn('Error', e);
				dispatch(addQuestionAnswer(info));
				alert('There was an error linking the tweet. Try again.');
			})
	}
}

export function addQuestionAnswer({loggedInUser, qid, answer}) {
	return {
		type: ADD_QUESTION_ANSWER,
		loggedInUser,
		qid,
		answer
	}
}
