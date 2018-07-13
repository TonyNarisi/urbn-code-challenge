import fetch from 'cross-fetch';
import 'cross-fetch/polyfill';
import { API_ROOT } from '../constants.js';

export const BEGIN_API_CALL = 'BEGIN_API_CALL';
export const END_API_CALL = 'END_API_CALL';

export function getAll(callType) {
  return function(dispatch) {
    dispatch(beginApiCall(callType));
    return fetch(`${API_ROOT}/${callType}`, {
      method: 'GET'
    })
    .then(data => {
      data.json().then(resp => {
        if (resp.data.error) {
          dispatch(endApiCall(callType, true, []));
        } else {
          let cleanedPayload = resp.data.body.map(item => {
            return { id: item.id, name: item.name };
          })
          dispatch(endApiCall(callType, false, cleanedPayload));
        }
      })
    })
    .catch(err => {

      dispatch(endApiCall(callType, true, []));
    })
  }
}

function beginApiCall(callType) {
  return { type: BEGIN_API_CALL, callType };
}

function endApiCall(callType, hasErrors, payload) {
  return { type: END_API_CALL, callType, hasErrors, payload };
}