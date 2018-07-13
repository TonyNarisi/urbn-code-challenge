import {
  SHOW_NO_FILTER_ERROR, 
  HIDE_NO_FILTER_ERROR,
  SELECT_SIMILAR_GAME,
  CHANGE_FILTERS,
  BEGIN_SIMILARS_CALL,
  END_SIMILARS_CALL
} from '../actions/similar_games.js';

const initialState = {
  'displayNoFilterError': false,
  'isRetrievingSimilars': false,
  'similarsApiErrors': false,
  'similars': [],
  'selectedSimilarGame': null,
  'filters': {
    'genres': [],
    'themes': [],
    'perspectives': []
  }
}

const similarGameData = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NO_FILTER_ERROR:
      return {
        ...state,
        displayNoFilterError: true
      }
    case HIDE_NO_FILTER_ERROR:
      return {
        ...state,
        displayNoFilterError: false
      }
    case BEGIN_SIMILARS_CALL:
      return {
        ...state,
        isRetrievingSimilars: true
      }
    case END_SIMILARS_CALL:
      return {
        ...state,
        isRetrievingSimilars: false,
        similarsApiErrors: action.hasErrors,
        similars: action.payload
      }
    case SELECT_SIMILAR_GAME:
      return {
        ...state,
        selectedSimilarGame: action.game
      }
    case CHANGE_FILTERS:
      var newFilters = state.filters[action.category];
      if (newFilters.indexOf(action.choice) === -1) {
        newFilters.push(action.choice);
      } else {
        newFilters.splice(newFilters.indexOf(action.choice), 1);
      }
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.category]: newFilters
        }
      }
    default:
      return state;
  }
}

export default similarGameData;