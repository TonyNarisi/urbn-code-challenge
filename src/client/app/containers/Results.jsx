import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchResults from './SearchResults';
import GameDetails from './GameDetails';
import SimilarResults from './SimilarResults';

class Results extends Component {
	render() {
		let props = this.props;
		return (
			<div>
				{/* Change these to be class based */}
				{ props.visibleScreen === 'search-results' &&
					<SearchResults />
				}
				{ props.visibleScreen === 'game-details' &&
					<GameDetails />
				}
				{ props.visibleScreen === 'similar-results' &&
					<SimilarResults />
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