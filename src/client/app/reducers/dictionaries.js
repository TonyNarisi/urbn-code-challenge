import {
  BEGIN_API_CALL,
  END_API_CALL
} from '../actions/dictionaries.js';
import { upperFirstChar } from '../helpers.js';

const initialState = {
  'isRetrievingGenres': false,
  'genresApiErrors': false,
  'genres': [],
  'isRetrievingThemes': false,
  'themesApiErrors': false,
  'themes': [],
  'isRetrievingPerspectives': false,
  'perspectivesApiErrors': false,
  'perspectives': []
}

const dictionaries = (state = initialState, action) => {
  switch (action.type) {
    case BEGIN_API_CALL:
      return {
        ...state,
        [`isRetrieving${upperFirstChar(action.callType)}`]: true
      }
    case END_API_CALL:
      return {
        ...state,
        [`isRetrieving${upperFirstChar(action.callType)}`]: false,
        [`${action.callType}ApiErrors`]: action.hasErrors,
        [action.callType]: action.payload
      }
    default:
      return state;
  }
}

export default dictionaries;