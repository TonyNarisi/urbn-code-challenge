// This should be a container, not a component
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectGame } from '../actions/index.js';
import { concatFullWords } from '../helpers.js';

class GameCard extends Component {
  render() {
    var hasAny = {};
    let props = this.props;
    let game = props.game;
    let cats = ['genres', 'themes'];
    for (var catNum = cats.length, i = 0; i < catNum; i++) {
      hasAny[cats[i]] = game[cats[i]] && game[cats[i]].length > 0 && props[cats[i]].length > 0;
    }
    return (
      <div
        className="game-card"
        onClick={ props.handleClick }>
        <div className="game__title-and-cover">
          { game.cover &&
            <img src={ game.cover.url } />
          }
          <h4>{ game.name }</h4>
        </div>
        <div className="game__bottom">
          { game.summary &&
            <p>{ concatFullWords(game.summary, 75) }...</p>
          }
          { !game.summary && game.storyline &&
            <p>{ concatFullWords(game.storyline, 75) }...</p>
          }
          { (hasAny.genres || hasAny.themes) &&
            <div>
              <ul>
                { cats.map(cat => {
                  return (
                    <span key={ cat }>
                      { hasAny[cat] && game[cat].map(tag => {
                        let tagName = props[cat].filter(dict => {
                          return dict.id === tag;
                        })[0].name;
                        return (
                          <li
                            key={ `${cat}${tag}` }
                            className="game__tag">
                            { tagName }
                          </li>
                        )
                      })}
                    </span>
                  )
                })}
              </ul>
            </div>
          }
          { !game.summary && !game.storyline && !hasAny.genres && !hasAny.themes &&
            <p>No information available</p>
          }
        </div>
      </div>
    )   
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    game: ownProps.game,
    genres: state.dictionaries.genres,
    themes: state.dictionaries.themes
  }
}

export default connect(mapStateToProps)(GameCard);