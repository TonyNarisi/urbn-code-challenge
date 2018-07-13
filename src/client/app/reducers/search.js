import {
  CHANGE_SEARCH_TERM,
  BEGIN_SEARCH_CALL,
  END_SEARCH_CALL,
  SHOW_NO_SEARCH_ERROR, 
  HIDE_NO_SEARCH_ERROR,
  SELECT_SEARCHED_GAME,
} from '../actions/search.js';

const initialState = {
  'isSearching': false,
  'searchApiErrors': false,
  'searchTerm': '',
  'searchedTerm': '',
  'searchResults': [],
  'displayNoSearchError': false,
  'selectedSearchedGame': null
}

const searchData = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.term
      }
    case BEGIN_SEARCH_CALL:
      return {
        ...state,
        isSearching: true,
        searchedTerm: state.searchTerm
      }
    case END_SEARCH_CALL:
      // Clean the perspectives property to make genre/theme code reproducible on the property
      let cleanedResults = action.results.map(game => {
        game.perspectives = game.player_perspectives
        return game;
      });
      return {
        ...state,
        isSearching: false,
        searchApiErrors: action.hasErrors,
        searchResults: cleanedResults
      }
    case SHOW_NO_SEARCH_ERROR:
      return {
        ...state,
        displayNoSearchError: true
      }
    case HIDE_NO_SEARCH_ERROR:
      return {
        ...state,
        displayNoSearchError: false
      }
    case SELECT_SEARCHED_GAME:
      return {
        ...state,
        selectedSearchedGame: action.game
      }
    default:
      return state;
  }
}

export default searchData;