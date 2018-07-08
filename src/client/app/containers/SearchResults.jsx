import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameCard from '../components/GameCard';

class SearchResults extends Component {
	render() {
		let props = this.props;
		return (
			<div>
				{ props.isSearching &&
					<h3>Searching for { props.searchTerm }</h3>
				}
				{ !props.isSearching && props.searchedTerm != '' &&
					<h3>Search results for { props.searchedTerm }</h3>
				}
				{ !props.isSearching && props.searchResults.length > 0 &&
					props.searchResults.map(game => {
						return(
							<GameCard
								key={ game.id }
								game={ game } />
						)
					})
				}
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		isSearching: state.isSearching,
		searchTerm: state.searchTerm,
		searchedTerm: state.searchedTerm,
		searchResults: state.searchResults,
		searchApiErrors: state.searchApiErrors
	}
}

export default connect(mapStateToProps)(SearchResults);