import { API_ROOT } from '../constants.js';

export const CHANGE_SEARCH_TERM = 'CHANGE_SEARCH_TERM';
export const BEGIN_SEARCH_CALL = 'BEGIN_SEARCH_CALL';
export const END_SEARCH_CALL = 'END_SEARCH_CALL';
export const SHOW_NO_SEARCH_ERROR = 'SHOW_NO_SEARCH_ERROR';
export const HIDE_NO_SEARCH_ERROR = 'HIDE_NO_SEARCH_ERROR';
export const SELECT_SEARCHED_GAME = 'SELECT_SEARCHED_GAME';

export function changeSearchTerm(term) {
  return { type: CHANGE_SEARCH_TERM, term };
}

export function makeSearchCall(term) {
  return function(dispatch) {
    dispatch(beginSearchCall());
    return fetch(`${API_ROOT}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        'term': term,
        'limit': 12,
        'offset': 0
      })
    })
    .then(data => {
      data.json().then(resp => {
        if (resp.data.error) {
          dispatch(endSearchCall(true, []));
        } else { 
          dispatch(endSearchCall(false, resp.data.body));
        }
      })
    })
    .catch(err => {
      dispatch(endSearchCall(true, []));
    })
  }
}

function beginSearchCall() {
  return { type: BEGIN_SEARCH_CALL };
}

function endSearchCall(hasErrors, results) {
  return { type: END_SEARCH_CALL, hasErrors, results };
}

export function showNoSearchError() {
  return { type: SHOW_NO_SEARCH_ERROR };
}

export function hideNoSearchError() {
  return { type: HIDE_NO_SEARCH_ERROR };
}

export function selectSearchedGame(game) {
  return { type: SELECT_SEARCHED_GAME, game };
}