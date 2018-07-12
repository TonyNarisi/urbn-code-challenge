import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeSearchTerm, makeSearchCall, showNoSearchError, hideNoSearchError } from '../actions/index.js';
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
							<form 
								onSubmit={ (e) => {
									e.preventDefault();
									if (props.searchTerm != '') {
										props.makeSearchCall(props.searchTerm);
										props.history.push('/search-results');
									}
								} }>
								<input
									type="text"
									value={ props.searchTerm }
									onChange={ (e) => { props.changeSearchTerm(e.target.value) } } />
								<div className="search__wrapper">
									<button
										className={ `theme-button ${ props.searchTerm === '' ? 'inactive' : '' }` }>
										Search
									</button>
								</div>
							</form>
							{ props.showNoSearchError &&
								<div class="error">
									<p>Please provide a search term</p>
								</div>
							}
						</div>
					</div>
				</div>
			</div>
		)		
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		searchTerm: state.searchTerm,
		showNoSearchError: state.showNoSearchError
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		changeSearchTerm: (term) => {
			dispatch(changeSearchTerm(term));
		},
		makeSearchCall: (term) => {
			dispatch(makeSearchCall(term));
		},
		showNoSearchError: () => {
			dispatch(showNoSearchError());
		},
		hideNoSearchError: () => {
			dispatch(hideNoSearchError());
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInteraction));