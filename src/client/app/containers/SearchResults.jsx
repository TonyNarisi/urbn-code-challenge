import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectSearchedGame } from '../actions/index.js';
import BackButton from './BackButton';
import GameCard from '../components/GameCard';

class SearchResults extends Component {
  render() {
    let props = this.props;
    return (
      <div>
        <BackButton 
          backScreen="search" />
        <div className="row-wrapper">
          <div className="row max-width standard-row-top-padding">
            <div className="col12 text-center">
              { props.isSearching &&
                <h3>Searching for { props.searchTerm }</h3>
              }
              { !props.isSearching && props.searchedTerm != '' &&
                <h3>Search results for { props.searchedTerm }</h3>
              }
            </div>
          </div>
        </div>
        <div className="row-wrapper">
          <div className="row max-width standard-row-padding">
            <div className="col12">
              { !props.isSearching && !props.searchApiErrors &&
                <div className="search-results__wrapper">
                  { props.searchResults.length > 0 ?
                      props.searchResults.map(game => {
                        return(
                          <GameCard
                            key={ game.id }
                            game={ game }
                            handleClick={ (e) => {
                              props.selectSearchedGame(game);
                              props.history.push('/game-details');
                            } } />
                        )
                      })
                    :
                      <h4 className="center-elm">
                        <span className="normal-weight">No results found. Please </span>
                        <a
                          href="#back"
                          onClick={ (e) => {
                            e.preventDefault();
                            props.history.goBack();
                          } }>
                          go back to the search screen
                        </a>
                        <span className="normal-weight"> and refine your query.</span>
                      </h4>
                  }
                </div>
              }
              { props.searchApiErrors &&
                <h4 className="center-elm">
                  <span className="normal-weight">Sorry, we encountered an error retrieving information from the API please </span>
                  <a
                    href="#back"
                    onClick={ (e) => {
                      e.preventDefault();
                      props.history.goBack();
                    } }>
                    return to the search screen
                  </a>
                  <span className="normal-weight"> and try submitting your search again.</span>
                </h4>
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
    isSearching: state.searchData.isSearching,
    searchTerm: state.searchData.searchTerm,
    searchedTerm: state.searchData.searchedTerm,
    searchResults: state.searchData.searchResults,
    searchApiErrors: state.searchData.searchApiErrors
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectSearchedGame: (game) => {
      dispatch(selectSearchedGame(game));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults));