const API_ROOT = '/api';

export const CHANGE_SEARCH_TERM = 'CHANGE_SEARCH_TERM';
export const BEGIN_SEARCH_CALL = 'BEGIN_SEARCH_CALL';
export const END_SEARCH_CALL = 'END_SEARCH_CALL';
export const BEGIN_API_CALL = 'BEGIN_API_CALL';
export const END_API_CALL = 'END_API_CALL';
export const SELECT_GAME = 'SELECT_GAME';

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
				'limit': 10,
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
			disaptch(endSearchCall(true, []));
		})
	}
}

function beginSearchCall() {
	return { type: BEGIN_SEARCH_CALL };
}

function endSearchCall(hasErrors, results) {
	return { type: END_SEARCH_CALL, hasErrors, results };
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

export function selectGame(game) {
	return { type: SELECT_GAME, game };
}