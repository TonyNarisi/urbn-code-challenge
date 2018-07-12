import {
	CHANGE_SEARCH_TERM,
	BEGIN_API_CALL,
	END_API_CALL,
	BEGIN_SEARCH_CALL,
	END_SEARCH_CALL,
	SHOW_NO_SEARCH_ERROR, 
	HIDE_NO_SEARCH_ERROR,
	SHOW_NO_FILTER_ERROR, 
	HIDE_NO_FILTER_ERROR,
	SELECT_SEARCHED_GAME,
	SELECT_SIMILAR_GAME,
	CHANGE_FILTERS,
	SWITCH_VISIBLE_SCREEN
} from '../actions/index.js';
import { upperFirstChar } from '../helpers.js';

const initialState = {
	'isSearching': false,
	'searchApiErrors': false,
	'searchTerm': 'bioshock',
	'searchedTerm': '',
	'searchResults': [],
	'displayNoSearchError': false,
	'displayNoFilterError': false,
	'isRetrievingGenres': false,
	'genresApiErrors': false,
	'genres': [],
	'isRetrievingThemes': false,
	'themesApiErrors': false,
	'themes': [],
	'isRetrievingPlatforms': false,
	'platformsApiErrors': false,
	'platforms': [],
	'isRetrievingPerspectives': false,
	'perspectivesApiErrors': false,
	'perspectives': [],
	'isRetrievingSimilars': false,
	'similarsApiErrors': false,
	'similars': [],
	'selectedSearchedGame': null,
	'selectedSimilarGame': null,
	'filters': {
		'genres': [],
		'themes': [],
		'perspectives': []
	}
}

const appStore = (state = initialState, action) => {
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
		case SELECT_SEARCHED_GAME:
			return {
				...state,
				selectedSearchedGame: action.game
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

export default appStore;