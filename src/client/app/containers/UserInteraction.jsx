import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeSearchCall } from '../actions/index.js';

class UserInteraction extends Component {
	render() {
		let props = this.props;
		return (
			<div>
				<p>Hello worlds</p>
				<button
					onClick={ (e) => { props.makeSearchCall(props.searchTerm) } }>
					Click to search
				</button>
			</div>
		)		
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		searchTerm: state.searchTerm
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		makeSearchCall: (term) => {
			dispatch(makeSearchCall(term));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInteraction);