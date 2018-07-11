import {
	CHANGE_SEARCH_TERM,
	BEGIN_API_CALL,
	END_API_CALL,
	BEGIN_SEARCH_CALL,
	END_SEARCH_CALL,
	SELECT_GAME,
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
	'isRetrievingGenres': false,
	'genresApiErrors': false,
	'genres': [],
	'isRetrievingThemes': false,
	'themesApiErrors': false,
	'themes': [],
	'isRetrievingSimilars': false,
	'similarsApiErrors': false,
	'similars': [],
	'visibleScreen': 'search-results',
	'selectedGame': null,
	'selectedSimilarGame': null,
	'filters': {
		'genres': [],
		'themes': []
	}
}

const appStore = (state = initialState, action) => {
	console.log(action);
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
			return {
				...state,
				isSearching: false,
				searchApiErrors: action.hasErrors,
				searchResults: action.results
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
		case SELECT_GAME:
			return {
				...state,
				selectedGame: action.game,
				visibleScreen: 'game-details'
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
		case SWITCH_VISIBLE_SCREEN:
			return {
				...state,
				visibleScreen: action.screen
			}
		default:
			return state;
	}
}

export default appStore;