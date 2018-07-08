import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAll } from '../actions/index.js';
import UserInteraction from '../containers/UserInteraction';
import Results from '../containers/Results';
import styles from '../styles/main.scss';

class App extends Component {
	componentWillMount() {
		let props = this.props;
		props.getAll('genres');
		props.getAll('themes');
	}

	render() {
		return (
			<div>
				<UserInteraction />
				<Results />
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