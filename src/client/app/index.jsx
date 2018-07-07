import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import appStore from './reducers/index.js';

export const store = createStore(
	appStore,
	applyMiddleware(ReduxThunk)
);

// Allow quick access to Redux store in development and local server environments
if (process.env.NODE_ENV != 'production') {
	window.reduxStore = store;
}

render(
	<Provider store={ store }>
		<p>Hello world</p>
	</Provider>,
	document.getElementById('react-app')
);