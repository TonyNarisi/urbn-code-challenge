import {
	BEGIN_SEARCH_CALL,
	END_SEARCH_CALL,
	BEGIN_GENRE_CALL,
	END_GENRE_CALL
} from '../actions/index.js';

const initialState = {
	'isSearching': false,
	'searchApiErrors': false,
	'searchTerm': 'bioshock',
	'searchedTerm': '',
	'searchResults': [],
	'isRetrievingGenres': false,
	'genreApiErrors': false,
	'genres': []
}

const appStore = (state = initialState, action) => {
	console.log(action);
	switch (action.type) {
		case BEGIN_SEARCH_CALL:
			return {
				...state,
				isSearching: true,
				searchedTerm: state.searchTerm
			}
		case END_SEARCH_CALL:
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
					tags: res.tags,
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
		case BEGIN_GENRE_CALL:
			return {
				...state,
				isRetrievingGenres: true
			}
		case END_GENRE_CALL:
			let genreList = action.genres.map(genre => {
				return { id: genre.id, name: genre.name };
			})
			return {
				...state,
				isRetrievingGenres: false,
				genreApiErrors: action.hasErrors,
				genres: genreList
			}
		default:
			return state;
	}
}

export default appStore;