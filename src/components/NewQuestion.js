import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/userQuestions';
import { Header, Form } from 'semantic-ui-react'
import PropTypes from 'prop-types';

class NewQuestion extends Component {
	static propTypes = {
		// from connect
		dispatch: PropTypes.func.isRequired,
		// from mapStateToProps
		loggedInUser: PropTypes.string.isRequired
	};

	state = {
		optionOneText: '',
		optionTwoText: ''
	};

	handleChanges = (e, {name, value}) => {
		this.setState({
			[name]: value
		})
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const {optionOneText, optionTwoText} = this.state;
		const {dispatch} = this.props;

		dispatch(handleAddQuestion({optionOneText, optionTwoText}));

		this.setState({
			optionOneText: '',
			optionTwoText: ''
		});

		this.props.history.push(`/`);
	};

	render() {
		const {optionOneText, optionTwoText} = this.state;

		return (
			<Fragment>
				<Header as='h2' textAlign='center'>Redux Polling</Header>
				<Form onSubmit={this.handleSubmit}>
					<Form.Group unstackable widths={2}>
						<Form.Input label='Option One' name='optionOneText' value={optionOneText} placeholder='Add the Option One' onChange={this.handleChanges} />
						<Form.Input label='Option Two' name='optionTwoText' value={optionTwoText} placeholder='Add the Option Two' onChange={this.handleChanges} />
					</Form.Group>
					<Form.Group unstackable widths={1}>
						<Form.Button content='Add New Question' disabled={optionOneText === '' || optionTwoText === ''} />
					</Form.Group>
				</Form>
			</Fragment>
		)
	}
}

function mapStateToProps({loggedInUser}) {
	return {
		loggedInUser
	}
}

export default connect(mapStateToProps)(NewQuestion);
