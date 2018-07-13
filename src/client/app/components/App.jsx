import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import { getAll } from '../actions/index.js';
import UserInteraction from '../containers/UserInteraction';
import SearchResults from '../containers/SearchResults';
import GameDetails from '../containers/GameDetails';
import SimilarResults from '../containers/SimilarResults';
import SimilarGame from '../containers/SimilarGame';
import Preloader from './Preloader';
import Hero from './Hero';

const history = createHistory();

class App extends Component {
  componentWillMount() {
    let props = this.props;
    props.getAll('genres');
    props.getAll('themes');
    props.getAll('perspectives');
  }

  render() {
    let props = this.props;
    return (
      <div className="app-wrapper">
        <Hero />
        <Router history={ history }>
          <div>
            <Route exact path="/" component={ UserInteraction } />
            <Route path="/search-results" component={ SearchResults } />
            <Route path="/game-details" component={ GameDetails } />
            <Route path="/similar-results" component={ SimilarResults } />
            <Route path="/similar-game" component={ SimilarGame } />
          </div>
        </Router>
        { (props.isSearching || props.isRetrievingSimilars) &&
          <Preloader />
        }
      </div>
    )   
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
    isSearching: state.searchData.isSearching,
    isRetrievingSimilars: state.similarGameData.isRetrievingSimilars
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAll: (callType) => {
      dispatch(getAll(callType));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);