import React, { Component } from 'react';
import { connect } from 'react-redux';
import { upperFirstChar } from '../helpers.js';

class GenresThemesPerspects extends Component {
  render() {
    let props = this.props;
    let cats = props.cats;
    let object = props.object;
    return(
      <div className="row-wrapper">
        <div className="row max-width">
          { cats.map(cat => {
            return (
              object[cat] && object[cat].length > 0 &&
                <div
                  className={ `col${ Math.round(12/cats.filter(curCat => { return object[curCat].length > 0 }).length) }` }
                  key={ cat }>
                  <h4>{ upperFirstChar(cat) }</h4>
                  <ul>
                    { object[cat].map(elm => {
                      let elmName = props[cat].filter(dict => {
                        return dict.id === elm;
                      })[0].name;
                      return (
                        <li key={ `${cat}${elm}` }>{ elmName }</li>
                      )
                    })}
                  </ul>
                </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    genres: state.dictionaries.genres,
    perspectives: state.dictionaries.perspectives,
    themes: state.dictionaries.themes
  }
}

export default connect(mapStateToProps)(GenresThemesPerspects);