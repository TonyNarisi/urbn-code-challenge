import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectSimilarGame } from '../actions/index.js';
import BackButton from './BackButton';
import GameCard from '../components/GameCard';
import GenresThemesPerspects from '../components/GenresThemesPerspects';

class SimilarResults extends Component {
  render() {
    let props = this.props;
    return (
      <div>
        <BackButton
          backScreen={ props.selectedSearchedGame.name } />
        <div className="row-wrapper">
          <div className="row max-width standard-row-top-padding">
            <div className="col12">
              <h3>Displaying games with:</h3>
            </div>
          </div>
        </div>
        <GenresThemesPerspects 
          cats={ ['genres', 'themes', 'perspectives'] }
          object={ props.filters } />
        <div className="row-wrapper">
          <div className="row max-width standard-row-padding">
            <div className="col12">
              <div className="search-results__wrapper">
                { props.similars.map(game => {
                  return (
                    <GameCard 
                      key={ game.id }
                      game={ game }
                      handleClick={ (e) => {
                        props.selectSimilarGame(game);
                        props.history.push('similar-game');
                      } } />
                  )
                })}
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
    similars: state.similarGameData.similars,
    filters: state.similarGameData.filters,
    selectedSearchedGame: state.searchData.selectedSearchedGame
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectSimilarGame: (game) => {
      dispatch(selectSimilarGame(game));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SimilarResults));