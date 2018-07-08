const API_ROOT = '/api';

export const BEGIN_SEARCH_CALL = 'BEGIN_SEARCH_CALL';
export const END_SEARCH_CALL = 'END_SEARCH_CALL';
export const BEGIN_GENRE_CALL = 'BEGIN_GENRE_CALL';
export const END_GENRE_CALL = 'END_GENRE_CALL';

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

export function getAllGenres() {
	return function(dispatch) {
		dispatch(beginGenreCall());
		return fetch(`${API_ROOT}/genres`, {
			method: 'GET'
		})
		.then(data => {
			data.json().then(resp => {
				console.log(resp);
				dispatch(endGenreCall(false, resp.data.body));
			})
		})
		.catch(err => {
			console.log(err);
			dispatch(endGenreCall(true, []));
		})
	}
}

function beginGenreCall() {
	return { type: BEGIN_GENRE_CALL };
}

function endGenreCall(hasErrors, genres) {
	console.log(genres);
	return { type: END_GENRE_CALL, hasErrors, genres };
}