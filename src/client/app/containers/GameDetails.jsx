import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeFilters, searchForSimilar, showNoFilterError, hideNoFilterError } from '../actions/index.js';
import { upperFirstChar, concatFullWords } from '../helpers.js';
import BackButton from './BackButton';
import GameInfo from '../components/GameInfo';

class GameDetails extends Component {
  render() {
    let props = this.props;
    let filters = props.filters;
    let game = props.selectedGame;
    let cats = ['genres', 'themes', 'perspectives'];
    var hasFilters = false;
    for (var catNum = cats.length, i = 0; i < catNum; i++) {
      if (filters[cats[i]].length > 0) {
        hasFilters = true;
      }
    }
    return(
      <div>
        <BackButton 
          backScreen="search results" />
        <GameInfo 
          game={ game }
          narrow={ true } />
        <div className="row-wrapper">
          <div className="row max-width standard-row-top-padding game__genres-themes">
            { cats.map(cat => {
              return(
                <div
                  key={ cat }
                  className="col4">
                  { game[cat] && game[cat].length > 0 && props[cat].length > 0 &&
                    <div>
                      <p>{ upperFirstChar(cat) }</p>
                      <ul>
                        { game[cat].map(elm => {
                          let elmName = props[cat].filter(dict => { return dict.id === elm })[0].name;
                          return (
                            <li key={ `${cat}${elm}` }>
                              <label>
                                <input
                                  type="checkbox"
                                  checked={ !!(filters[cat].indexOf(elm) > -1) }
                                  value={ `${cat}${elm}` }
                                  onChange={ (e) => { props.changeFilters(cat, elm) } } />
                                { elmName }
                              </label>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  }
                </div>
              )
            })}
          </div>
        </div>
        <div className="row-wrapper">
          <div className="row max-width standard-row-bottom-padding small-row-top-padding">
            <div className="col12 text-center">
              <button
                className={ `theme-button ${ hasFilters ? '' : 'inactive' }` }
                onClick={ (e) => {
                  if (hasFilters) {
                    props.hideNoFilterError();
                    props.searchForSimilar(props.filters);
                    props.history.push('/similar-results');
                  } else {
                    props.showNoFilterError();
                  }
                } }>
                Search for similar games
              </button>
              { props.displayNoFilterError &&
                <div className="error">
                  <p>Please provide filtering criteria</p>
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
    selectedGame: state.searchData.selectedSearchedGame,
    genres: state.dictionaries.genres,
    themes: state.dictionaries.themes,
    perspectives: state.dictionaries.perspectives,
    filters: state.similarGameData.filters,
    displayNoFilterError: state.similarGameData.displayNoFilterError
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeFilters: (cat, elm) => {
      dispatch(changeFilters(cat, elm));
    },
    searchForSimilar: (filters) => {
      dispatch(searchForSimilar(filters));
    },
    showNoFilterError: () => {
      dispatch(showNoFilterError());
    },
    hideNoFilterError: () => {
      dispatch(hideNoFilterError());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails);