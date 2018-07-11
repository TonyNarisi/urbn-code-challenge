import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeSearchTerm, makeSearchCall } from '../actions/index.js';
import Explanation from '../components/Explanation';

class UserInteraction extends Component {
	render() {
		let props = this.props;
		return (
			<div className="user-interaction">
				<Explanation />
				<div className="row-wrapper">
					<div className="row max-width narrow-column">
						<div className="col12">
							<input
								type="text"
								value={ props.searchTerm }
								onChange={ (e) => { props.changeSearchTerm(e.target.value) } } />
							<div className="search__wrapper">
								<button
									className="theme-button"
									onClick={ (e) => { 
										props.makeSearchCall(props.searchTerm);
										props.history.push('/search-results');
									} }>
									Search
								</button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInteraction));