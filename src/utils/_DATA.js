import { camelize } from './helpers';

let users = {
	markzucker: {
		id: 'markzucker',
		name: 'Mark Zuckerberg',
		avatarURL: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Mark_Zuckerberg_F8_2018_Keynote_%28cropped_2%29.jpg',
		answers: {
			"8xf0y6ziyjabvozdd253nd": 'optionOne',
			"6ni6ok3ym7mf1p33lnez": 'optionOne',
			"am8ehyc8byjqgar0jgpub9": 'optionTwo',
			"loxhs1bqm25b708cmbf3g": 'optionTwo'
		},
		questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
	},
	sundarpichai: {
		id: 'sundarpichai',
		name: 'Sundar Pichai',
		avatarURL: 'https://s3.amazonaws.com/media.mediapost.com/dam/cropped/2017/07/24/sundarpichai-560.JPEG',
		answers: {
			"vthrdm985a262al8qx3do": 'optionOne',
			"xj352vofupe1dqz9emx13r": 'optionTwo',
		},
		questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
	},
	phoebegates: {
		id: 'phoebegates',
		name: 'Phoebe Adele Gates',
		avatarURL: 'https://www.celebtattler.com/wp-content/uploads/2018/09/4-3.png',
		answers: {
			"xj352vofupe1dqz9emx13r": 'optionOne',
			"vthrdm985a262al8qx3do": 'optionTwo',
			"6ni6ok3ym7mf1p33lnez": 'optionOne'
		},
		questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
	}
};

let questions = {
	"8xf0y6ziyjabvozdd253nd": {
		id: '8xf0y6ziyjabvozdd253nd',
		author: 'markzucker',
		timestamp: 1467166872634,
		optionOne: {
			votes: ['markzucker'],
			text: 'have horrible short term memory',
		},
		optionTwo: {
			votes: [],
			text: 'have horrible long term memory'
		}
	},
	"6ni6ok3ym7mf1p33lnez": {
		id: '6ni6ok3ym7mf1p33lnez',
		author: 'phoebegates',
		timestamp: 1468479767190,
		optionOne: {
			votes: [],
			text: 'become a superhero',
		},
		optionTwo: {
			votes: ['markzucker', 'sundarpichai'],
			text: 'become a supervillian'
		}
	},
	"am8ehyc8byjqgar0jgpub9": {
		id: 'am8ehyc8byjqgar0jgpub9',
		author: 'markzucker',
		timestamp: 1488579767190,
		optionOne: {
			votes: [],
			text: 'be telekinetic',
		},
		optionTwo: {
			votes: ['phoebegates'],
			text: 'be telepathic'
		}
	},
	"loxhs1bqm25b708cmbf3g": {
		id: 'loxhs1bqm25b708cmbf3g',
		author: 'phoebegates',
		timestamp: 1482579767190,
		optionOne: {
			votes: [],
			text: 'be a front-end developer',
		},
		optionTwo: {
			votes: ['sundarpichai'],
			text: 'be a back-end developer'
		}
	},
	"vthrdm985a262al8qx3do": {
		id: 'vthrdm985a262al8qx3do',
		author: 'markzucker',
		timestamp: 1489579767190,
		optionOne: {
			votes: ['sundarpichai'],
			text: 'find $50 yourself',
		},
		optionTwo: {
			votes: ['sundarpichai'],
			text: 'have your best friend find $500'
		}
	},
	"xj352vofupe1dqz9emx13r": {
		id: 'xj352vofupe1dqz9emx13r',
		author: 'sundarpichai',
		timestamp: 1493579767190,
		optionOne: {
			votes: ['phoebegates'],
			text: 'write JavaScript',
		},
		optionTwo: {
			votes: ['phoebegates'],
			text: 'write Swift'
		}
	},
};

function generateUID() {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers() {
	return new Promise((res, rej) => {
		setTimeout(() => res({...users}), 1000)
	})
}

export function _getQuestions() {
	return new Promise((res, rej) => {
		setTimeout(() => res({...questions}), 1000)
	})
}

function formatQuestion({optionOneText, optionTwoText, author}) {
	return {
		id: generateUID(),
		timestamp: Date.now(),
		author,
		optionOne: {
			votes: [],
			text: optionOneText,
		},
		optionTwo: {
			votes: [],
			text: optionTwoText,
		}
	}
}

export function _saveQuestion(question) {
	return new Promise((res, rej) => {
		const loggedInUser = question.author;
		const formattedQuestion = formatQuestion(question)

		setTimeout(() => {
			questions = {
				...questions,
				[formattedQuestion.id]: formattedQuestion
			};

			users = {
				...users,
				[loggedInUser]: {
					...users[loggedInUser],
					questions: users[loggedInUser].questions.concat([formattedQuestion.id])
				}
			};

			res(formattedQuestion)
		}, 1000)
	})
}

export function _saveQuestionAnswer({loggedInUser, qid, answer}) {
	return new Promise((res, rej) => {
		setTimeout(() => {
			users = {
				...users,
				[loggedInUser]: {
					...users[loggedInUser],
					answers: {
						...users[loggedInUser].answers,
						[qid]: answer
					}
				}
			};

			questions = {
				...questions,
				[qid]: {
					...questions[qid],
					[answer]: {
						...questions[qid][answer],
						votes: questions[qid][answer].votes.concat([loggedInUser])
					}
				}
			};

			res()
		}, 500)
	})
}

function formatUser({avatarURL, name}) {
	const unique = new Date().getMilliseconds();

	return {
		id: `${camelize(name).toLowerCase()}${unique}`,
		name,
		avatarURL,
		answers: {},
		questions: []
	}
}

export function _saveUser(user) {
	return new Promise((res, rej) => {
		const formattedUser = formatUser(user);

		setTimeout(() => {
			users = {
				...users,
				[formattedUser.id]: formattedUser
			};

			res(formattedUser)
		}, 1000)
	})
}
