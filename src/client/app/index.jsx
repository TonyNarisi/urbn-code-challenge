import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import appStore from './reducers/index.js';
import UserInteraction from './containers/UserInteraction';

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
		<UserInteraction />
	</Provider>,
	document.getElementById('react-app')
);