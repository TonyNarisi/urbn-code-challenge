import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeSearchTerm, makeSearchCall } from '../actions/index.js';

class UserInteraction extends Component {
	render() {
		let props = this.props;
		return (
			<div>
				<input
					type="text"
					value={ props.searchTerm }
					onChange={ (e) => { props.changeSearchTerm(e.target.value) } } />
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
		changeSearchTerm: (term) => {
			dispatch(changeSearchTerm(term));
		},
		makeSearchCall: (term) => {
			dispatch(makeSearchCall(term));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInteraction);