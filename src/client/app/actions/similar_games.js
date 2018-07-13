import fetch from 'cross-fetch';
import 'cross-fetch/polyfill';

import { API_ROOT } from '../constants.js';

export const SHOW_NO_FILTER_ERROR = 'SHOW_NO_FILTER_ERROR';
export const HIDE_NO_FILTER_ERROR = 'HIDE_NO_FILTER_ERROR';
export const BEGIN_SIMILARS_CALL = 'BEGIN_SIMILARS_CALL';
export const END_SIMILARS_CALL = 'END_SIMILARS_CALL';
export const SELECT_SIMILAR_GAME = 'SELECT_SIMILAR_GAME';
export const CHANGE_FILTERS = 'CHANGE_FILTERS';

export function showNoFilterError() {
  return { type: SHOW_NO_FILTER_ERROR };
}

export function hideNoFilterError() {
  return { type: HIDE_NO_FILTER_ERROR };
}

function beginSimilarsCall() {
  return { type: BEGIN_SIMILARS_CALL };
}

function endSimilarsCall(hasErrors, payload) {
  return { type: END_SIMILARS_CALL, hasErrors, payload };
}

export function selectSimilarGame(game) {
  return { type: SELECT_SIMILAR_GAME, game };
}

export function changeFilters(category, choice) {
  return { type: CHANGE_FILTERS, category, choice };
}

export function searchForSimilar(filters) {
  return function(dispatch) {
    dispatch(beginSimilarsCall());
    return fetch(`${API_ROOT}/similar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(filters)
    })
    .then(data => {
      data.json().then(resp => {
        if (resp.data.error) {
          dispatch(endSimilarsCall(true, []));
        } else {
          let cleanedBody = resp.data.body.map(game => {
            game.perspectives = game.player_perspectives;
            return game;
          })
          dispatch(endSimilarsCall(false, cleanedBody));
        }
      })
    })
    .catch(err => {
      dispatch(endSimilarsCall(true, []));
    })
  }
}