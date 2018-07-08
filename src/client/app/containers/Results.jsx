import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchResults from './SearchResults';
import GameDetails from './GameDetails';

class Results extends Component {
	render() {
		let props = this.props;
		return (
			<div>
				{ props.visibleScreen === 'search-results' &&
					<SearchResults />
				}
				{ props.visibleScreen === 'game-details' &&
					<GameDetails />
				}
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		visibleScreen: state.visibleScreen
	}
}

export default connect(mapStateToProps)(Results);