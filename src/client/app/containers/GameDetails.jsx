import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { changeFilters, searchForSimilar } from '../actions/index.js';
import { upperFirstChar, concatFullWords } from '../helpers.js';

class GameDetails extends Component {
	render() {
		let props = this.props;
		let game = props.selectedGame;
		let cats = ['genres', 'themes'];
		return(
			<div>
				<div className="row-wrapper">
					<div className="row max-width standard-row-top-padding">
						<div className="col12">
							<h2 className="text-center">{ game.name }</h2>
							{ game.summary &&
								<p>{ game.summary }</p>
							}
							{ !game.summary && game.storyline &&
								<p>{ game.storyline }</p>
							}
						</div>
					</div>
				</div>
				<div className="row-wrapper">
					<div className="row max-width standard-row-top-padding game__genres-themes">
						{ cats.map(cat => {
							return(
								<div
									key={ cat }
									className="col6">
									{ game[cat] && game[cat].length > 0 && props[cat].length > 0 &&
										<div>
											<p>{ upperFirstChar(cat) }</p>
											<ul>
												{ game[cat].map(elm => {
													let elmName = props[cat].filter(dict => { return dict.id === elm })[0].name;
													return (
														<li key={ `${cat}${elm}` }>
															<label>
																<input
																	type="checkbox"
																	checked={ !!(props.filters[cat].indexOf(elm) > -1) }
																	value={ `${cat}${elm}` }
																	onChange={ (e) => { props.changeFilters(cat, elm) } } />
																{ elmName }
															</label>
														</li>
													)
												})}
											</ul>
										</div>
									}
								</div>
							)
						})}
					</div>
				</div>
				<div className="row-wrapper">
					<div className="row max-width standard-row-bottom-padding small-row-top-padding">
						<div className="col12 theme-button">
							<button
								className="theme-button"
								onClick={ (e) => {
									props.searchForSimilar(props.filters);
									props.history.push('/similar-results');
								} }>
								Search for similar games
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		selectedGame: state.selectedGame,
		genres: state.genres,
		themes: state.themes,
		filters: state.filters
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		changeFilters: (cat, elm) => {
			dispatch(changeFilters(cat, elm));
		},
		searchForSimilar: (filters) => {
			dispatch(searchForSimilar(filters));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails);