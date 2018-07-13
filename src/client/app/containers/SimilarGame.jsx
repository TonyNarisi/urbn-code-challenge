import React, { Component } from 'react';
import { connect } from 'react-redux';
import { convertSecs } from '../helpers.js';
import BackButton from './BackButton';
import GameInfo from '../components/GameInfo';
import GenresThemesPerspects from '../components/GenresThemesPerspects';

class SimilarGame extends Component {
  render() {
    let props = this.props;
    let game = props.game;
    return (
      <div>
        <BackButton 
          backScreen="similar games" />
        <GameInfo
          game={ game }
          narrow={ true } />
        <GenresThemesPerspects 
          cats={ ['genres', 'themes', 'perspectives'] }
          object={ game } />
        <div className="row-wrapper">
          <div className="row max-width standard-row-padding extra-game-info">
            <div className="col12">
              { game.total_rating &&
                <div>
                  <h4>Total Rating <em>(Average of IGDB User and External Critic Reviews)</em>:</h4>
                  <h5>{ game.total_rating.toFixed(2) }</h5>
                </div>
              }
              { game.time_to_beat && game.time_to_beat.normally &&
                <div>
                  <h4>Average Time to Beat</h4>
                  <h5>{ convertSecs(game.time_to_beat.normally) }</h5>
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
    game: state.similarGameData.selectedSimilarGame
  }
}

export default connect(mapStateToProps)(SimilarGame)