import React, { Component } from 'react';
import { connect } from 'react-redux';

class GameCard extends Component {
	render() {
		let props = this.props;
		let game = props.game;
		return (
			<div>
				{ game.cover &&
					<img src={ game.cover.url } />
				}
				<h4>{ game.name }</h4>
				{ game.summary &&
					<p>{ game.summary }</p>
				}
				{ !game.summary && game.storyline &&
					<p>{ game.storyline }</p>
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
									<li key={ genre.id }>{ genreName }</li>
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

export default connect(mapStateToProps)(GameCard);