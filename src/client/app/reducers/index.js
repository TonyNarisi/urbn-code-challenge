import {
	CHANGE_SEARCH_TERM,
	BEGIN_API_CALL,
	END_API_CALL,
	BEGIN_SEARCH_CALL,
	END_SEARCH_CALL,
	SELECT_GAME
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
	'visibleScreen': 'search-results',
	'selectedGame': null
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
			// Move this to the API call to limit returned fields
			let searchResults = action.results.map(res => {
				return {
					cover: res.cover,
					developers: res.developers,
					game_modes: res.game_modes,
					games: res.games,
					genres: res.genres,
					id: res.id,
					name: res.name,
					platforms: res.platforms,
					player_perspectives: res.player_perspectives,
					storyline: res.storyline,
					summary: res.summary,
					keywords: res.keywords,
					themes: res.themes,
					time_to_beat: res.time_to_beat,
					total_rating: res.total_rating
				}
			})
			return {
				...state,
				isSearching: false,
				searchApiErrors: action.hasErrors,
				searchResults
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
		default:
			return state;
	}
}

export default appStore;