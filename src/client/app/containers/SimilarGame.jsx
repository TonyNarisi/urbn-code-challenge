import React, { Component } from 'react';
import { connect } from 'react-redux';

class SimilarGame extends Component {
	render() {
		let props = this.props;
		return (
			<div>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		game: state.selectedSimilarGame
	}
}

export default connect(mapStateToProps)(SimilarGame)