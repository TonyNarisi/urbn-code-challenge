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
                    props.hideNoSearchError();
                    props.makeSearchCall(props.searchTerm);
                    props.history.push('/search-results');
                  } else {
                    props.showNoSearchError();
                  }
                } }>
                <input
                  type="text"
                  placeholder="Stardew Valley"
                  value={ props.searchTerm }
                  onChange={ (e) => { props.changeSearchTerm(e.target.value) } } />
                <div className="search__wrapper">
                  <button
                    className={ `theme-button ${ props.searchTerm === '' ? 'inactive' : '' }` }>
                    Search
                  </button>
                </div>
              </form>
              { props.displayNoSearchError &&
                <div className="error">
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
    searchTerm: state.searchData.searchTerm,
    displayNoSearchError: state.searchData.displayNoSearchError
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