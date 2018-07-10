import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { upperFirstChar } from '../helpers.js';
import GameCard from '../components/GameCard';

class SimilarResults extends Component {
	render() {
		let props = this.props;
		let cats = ['genres', 'themes'];
		return (
			<div>
				<p>Displaying games with:</p>
				<div>
					{	cats.map(cat => {
						return (
							<div
								key={ cat }>
								{ cat.length > 0 &&
									<div>
										<p>{ upperFirstChar(cat) }</p>
										<ul>
											{ props.filters[cat].map(elm => {
												// Extract this to helper probably
												let elmName = props[cat].filter(dict => {
													return dict.id === elm;
												})[0].name;
												return (
													<li key={ `${cat}${elm}` }>{ elmName }</li>
												)
											})}
										</ul>
									</div>
								}
							</div>
						)
					})}
				</div>
				{ props.similars.map(game => {
					return (
						<GameCard 
							key={ game.id }
							game={ game } />
					)
				})}
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		similars: state.similars,
		filters: state.filters,
		genres: state.genres,
		themes: state.themes
	}
}

export default connect(mapStateToProps)(SimilarResults);