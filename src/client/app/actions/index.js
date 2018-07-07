const API_ROOT = '/api';

export const BEGIN_SEARCH_CALL = 'BEGIN_SEARCH_CALL';
export const END_SEARCH_CALL = 'END_SEARCH_CALL';

export function makeSearchCall(term) {
	return function(dispatch) {
		dispatch(beginSearchCall());
		return fetch(`${API_ROOT}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(data => {
			data.json().then(resp => {
				console.log(resp);
				dispatch(endSearchCall(false));
			})
		})
		.catch(err => {
			console.log(err);
			disaptch(endSearchCall(true));
		})
	}
}

function beginSearchCall() {
	return { type: BEGIN_SEARCH_CALL };
}

function endSearchCall() {
	return { type: END_SEARCH_CALL };
}