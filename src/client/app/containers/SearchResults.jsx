import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectSearchedGame } from '../actions/index.js';
import BackButton from './BackButton';
import GameCard from '../components/GameCard';

class SearchResults extends Component {
	render() {
		let props = this.props;
		return (
			<div>
				<BackButton 
					backScreen="search" />
				<div className="row-wrapper">
					<div className="row max-width standard-row-top-padding">
						<div className="col12 text-center">
							{ props.isSearching &&
								<h3>Searching for { props.searchTerm }</h3>
							}
							{ !props.isSearching && props.searchedTerm != '' &&
								<h3>Search results for { props.searchedTerm }</h3>
							}
						</div>
					</div>
				</div>
				<div className="row-wrapper">
					<div className="row max-width standard-row-padding">
						<div className="col12">
							<div className="search-results__wrapper">
								{ !props.isSearching && props.searchResults.length > 0 &&
									props.searchResults.map(game => {
										return(
											<GameCard
												key={ game.id }
												game={ game }
												handleClick={ (e) => {
													props.selectSearchedGame(game);
													props.history.push('/game-details');
												} } />
										)
									})
								}
							</div>
						</div>
					</div>
				</div>
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

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		selectSearchedGame: (game) => {
			dispatch(selectSearchedGame(game));
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults));