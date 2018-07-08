import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserInteraction from '../containers/UserInteraction';
import SearchResults from '../containers/SearchResults';

class App extends Component {
	render() {
		return (
			<div>
				<UserInteraction />
				<SearchResults />
			</div>
		)
	}
}

export default App;