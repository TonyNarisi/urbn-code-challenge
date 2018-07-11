import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import { getAll } from '../actions/index.js';
import UserInteraction from '../containers/UserInteraction';
import SearchResults from '../containers/SearchResults';
import GameDetails from '../containers/GameDetails';
import SimilarResults from '../containers/SimilarResults';
import SimilarGame from '../containers/SimilarGame';
import Hero from './Hero';
import styles from '../styles/main.scss';

const history = createHistory();

class App extends Component {
	componentWillMount() {
		let props = this.props;
		props.getAll('genres');
		props.getAll('themes');
	}

	render() {
		return (
			<div>
				<Hero />
				<Router history={ history }>
					<div>
						<Route exact path="/" component={ UserInteraction } />
						<Route path="/search-results" component={ SearchResults } />
						<Route path="/game-details" component={ GameDetails } />
						<Route path="/similar-results" component={ SimilarResults } />
						<Route path="/similar-game" component={ SimilarGame } />
					</div>
				</Router>
			</div>
		)		
	}
}

export const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getAll: (callType) => {
			dispatch(getAll(callType));
		}
	}
}

export default connect(null, mapDispatchToProps)(App);