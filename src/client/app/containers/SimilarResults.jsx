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
				<div className="row-wrapper">
					<div className="row max-width standard-row-top-padding">
						<div className="col12">
							<h3>Displaying games with:</h3>
						</div>
					</div>
				</div>
				<div className="row-wrapper">
					<div className="row max-width">
						{	cats.map(cat => {
							return (
								props.filters[cat].length > 0 &&
									<div
										className={ `col${ Math.round(12/cats.filter(arr => { return arr.length > 0 }).length) }` }
										key={ cat }>
										<h4>{ upperFirstChar(cat) }</h4>
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
							)
						})}
					</div>
				</div>
				<div className="row-wrapper">
					<div className="row max-width standard-row-padding">
						<div className="col12">
							<div className="search-results__wrapper">
								{ props.similars.map(game => {
									return (
										<GameCard 
											key={ game.id }
											game={ game } />
									)
								})}
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
		similars: state.similars,
		filters: state.filters,
		genres: state.genres,
		themes: state.themes
	}
}

export default connect(mapStateToProps)(SimilarResults);