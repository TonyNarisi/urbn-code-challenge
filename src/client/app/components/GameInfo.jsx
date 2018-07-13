import React, { Component } from 'react';

class GameInfo extends Component {
  render() {
    let props = this.props;
    let game = props.game;
    return (
      <div className="row-wrapper">
        <div className={ `row max-width standard-row-top-padding ${ props.narrow ? 'narrow-column' : '' }` }>
          <div className="col12">
            <h2 className="text-center">{ game.name }</h2>
            { game.summary &&
              <p>{ game.summary }</p>
            }
            { !game.summary && game.storyline &&
              <p>{ game.storyline }</p>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default GameInfo;