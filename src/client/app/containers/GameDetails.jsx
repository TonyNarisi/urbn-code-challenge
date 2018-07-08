import React, { Component } from 'react';
import { connect } from 'react-redux';

class GameDetails extends Component {
	render() {
		let props = this.props;
		let game = props.selectedGame;
		return(
			<h2>{ game.name }</h2>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		selectedGame: state.selectedGame
	}
}

export default connect(mapStateToProps)(GameDetails);