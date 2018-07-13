import React, { Component } from 'react';

class Hero extends Component {
  render() {
    return(
      <div className="row-wrapper hero__wrapper">
        <div className="row max-width hero__row">
          <div className="col12 text-center">
            <h1>Video Game Recommendations</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Hero;