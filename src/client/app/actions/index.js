const API_ROOT = '/api';

export const CHANGE_SEARCH_TERM = 'CHANGE_SEARCH_TERM';
export const BEGIN_SEARCH_CALL = 'BEGIN_SEARCH_CALL';
export const END_SEARCH_CALL = 'END_SEARCH_CALL';
export const SHOW_NO_SEARCH_ERROR = 'SHOW_NO_SEARCH_ERROR';
export const HIDE_NO_SEARCH_ERROR = 'HIDE_NO_SEARCH_ERROR';
export const BEGIN_API_CALL = 'BEGIN_API_CALL';
export const END_API_CALL = 'END_API_CALL';
export const SELECT_SEARCHED_GAME = 'SELECT_SEARCHED_GAME';
export const SELECT_SIMILAR_GAME = 'SELECT_SIMILAR_GAME';
export const CHANGE_FILTERS = 'CHANGE_FILTERS';
export const SWITCH_VISIBLE_SCREEN = 'SWITCH_VISIBLE_SCREEN';

export function changeSearchTerm(term) {
	return { type: CHANGE_SEARCH_TERM, term };
}

export function makeSearchCall(term) {
	// Potentially change this to use begin and end API call functions
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
				console.log(resp);
				// All calls to server need check for error
				dispatch(endSearchCall(false, resp.data.body));
			})
		})
		.catch(err => {
			console.log(err);
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

export function getAll(callType) {
	return function(dispatch) {
		dispatch(beginApiCall(callType));
		return fetch(`${API_ROOT}/${callType}`, {
			method: 'GET'
		})
		.then(data => {
			data.json().then(resp => {
				let cleanedPayload = resp.data.body.map(item => {
					return { id: item.id, name: item.name };
				})
				dispatch(endApiCall(callType, false, cleanedPayload));
			})
		})
		.catch(err => {
			console.log(err);
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

export function selectSearchedGame(game) {
	return { type: SELECT_SEARCHED_GAME, game };
}

export function selectSimilarGame(game) {
	return { type: SELECT_SIMILAR_GAME, game };
}

export function changeFilters(category, choice) {
	return { type: CHANGE_FILTERS, category, choice };
}

export function searchForSimilar(filters) {
	return function(dispatch) {
		dispatch(beginApiCall('similars'));
		return fetch(`${API_ROOT}/similar`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(filters)
		})
		.then(data => {
			data.json().then(resp => {
				let cleanedBody = resp.data.body.map(game => {
					game.perspectives = game.player_perspectives;
					return game;
				})
				dispatch(endApiCall('similars', false, cleanedBody));
				dispatch(switchVisibleScreen('similar-results'));
			})
		})
		.catch(err => {
			console.log(err);
			dispatch(endApiCall('similars', true, []));
		})
	}
}

export function switchVisibleScreen(screen) {
	return { type: SWITCH_VISIBLE_SCREEN, screen };
}