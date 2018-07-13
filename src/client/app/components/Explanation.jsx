import React, { Component } from 'react';

class Explanation extends Component {
  render() {
    return (
      <div className="row-wrapper">
        <div className="row max-width narrow-column standard-row-padding">
          <div className="col12">
            <h3 className="text-center">How It Works</h3>
            <p>Search for any video game you enjoyed below and choose it from the returned results.</p>
            <p>Once you've selected a game, you can choose any of its genres or themes, as well as the player perspective it's presented in, to try to find a similar game. The criteria selected will all be considered while finding the matches for similar games.</p>
            <p>You can select any of the games from the similar results screen to view its full summary, as well as its genres, themes, player perspective, and its average rating and average play time, if the data exists.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Explanation;