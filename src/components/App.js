import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import PrivateRoute from './PrivateRoute';
import Nav from './Nav';
import Login from './Login';
import Logout from './Logout';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';
import QuestionPage from './QuestionPage';
import NewQuestion from './NewQuestion';
import FourZeroFour from './FourZeroFour';
import { Container } from 'semantic-ui-react'
import PropTypes from 'prop-types';

class App extends Component {
	static propTypes = {
		// from connect
		dispatch: PropTypes.func.isRequired,
		// from mapStateToProps
		loading: PropTypes.bool.isRequired
	};

	componentDidMount() {
		this.props.dispatch(handleInitialData());
	}

	render() {
		return (
			<Router>
				<Fragment>
					<LoadingBar/>
					<Nav/>
					{this.props.loading === true
						? null
						:
						<Container>
							<Switch>
								<PrivateRoute path='/' exact component={Dashboard} />
								<PrivateRoute path='/leaderboard' exact component={Leaderboard} />
								<PrivateRoute path='/questions/:id' exact component={QuestionPage} />
								<PrivateRoute path='/add' exact component={NewQuestion} />
								<Route path='/login' component={Login}/>
								<Route path='/logout' component={Logout}/>
								<Route component={FourZeroFour}/>
							</Switch>
						</Container>
					}
				</Fragment>
			</Router>
		);
	}
}

function mapStateToProps({loadingBar}) {
	return {
		loading: loadingBar.default === 1,
	}
}

export default connect(mapStateToProps)(App);
