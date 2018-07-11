// This should be a container, not a component, or have the dispatch moved to SearchResults
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectGame } from '../actions/index.js';
import { concatFullWords } from '../helpers.js';

class GameCard extends Component {
	render() {
		let props = this.props;
		let game = props.game;
		let hasGenres = game.genres && game.genres.length > 0 && props.genres.length > 0;
		let hasThemes = game.themes && game.themes.length > 0 && props.themes.length > 0;
		return (
			<div
				className="game-card"
				onClick={ (e) => {
					props.selectGame(game);
					props.history.push('/game-details');
				} }>
				<div className="game__title-and-cover">
					{ game.cover &&
						<img src={ game.cover.url } />
					}
					<h4>{ game.name }</h4>
				</div>
				<div className="game__bottom">
					{ game.summary &&
						<p>{ concatFullWords(game.summary, 75) }...</p>
					}
					{ !game.summary && game.storyline &&
						<p>{ concatFullWords(game.storyline, 75) }...</p>
					}
					{ (hasGenres || hasThemes) &&
						<div>
							<ul>
								{ hasGenres && game.genres.map(genre => {
									let genreName = props.genres.filter(genreDict => {
										return genreDict.id === genre;
									})[0].name;
									return (
										<li 
											key={ `genre${ genre }` }
											className="game__tag">
											{ genreName }
										</li>
									)
								})}
								{ hasThemes && game.themes.map(theme => {
									let themeName = props.themes.filter(themeDict => {
										return themeDict.id === theme;
									})[0].name;
									return (
										<li
											key={ `theme${ theme }` }
											className="game__tag">
											{ themeName }
										</li>
									)
								})}
							</ul>
						</div>
					}
					{ !game.summary && !game.storyline && !hasGenres && !hasThemes &&
						<p>No information available</p>
					}
				</div>
			</div>
		)		
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		game: ownProps.game,
		genres: state.genres,
		themes: state.themes
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		selectGame: (game) => {
			dispatch(selectGame(game));
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameCard));