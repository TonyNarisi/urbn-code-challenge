// This should be a container, not a component, or have the dispatch moved to SearchResults
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectGame } from '../actions/index.js';
import { concatFullWords } from '../helpers.js';

class GameCard extends Component {
	render() {
		let props = this.props;
		let game = props.game;
		return (
			<div
				className="game-card"
				onClick={ (e) => { props.selectGame(game) } }>
				{ game.cover &&
					<img src={ game.cover.url } />
				}
				<h4>{ game.name }</h4>
				{ game.summary &&
					<p>{ concatFullWords(game.summary, 75) }...</p>
				}
				{ !game.summary && game.storyline &&
					<p>{ concatFullWords(game.storyline, 75) }...</p>
				}
				{ game.genres && game.genres.length > 0 && props.genres.length > 0 &&
					<div>
						<p>Genres</p>
						<ul>
							{ game.genres.map(genre => {
								let genreName = props.genres.filter(genreDict => {
									return genreDict.id === genre;
								})[0].name;
								return (
									<li key={ genre }>{ genreName }</li>
								)
							})}
						</ul>
					</div>
				}
			</div>
		)		
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		game: ownProps.game,
		genres: state.genres
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		selectGame: (game) => {
			dispatch(selectGame(game));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GameCard);