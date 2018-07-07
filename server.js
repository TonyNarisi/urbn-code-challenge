const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

const igdb = require('igdb-api-node').default;
const API_KEY = '8304f6f7976ed1399b55412a9acadeca';
const client = igdb(API_KEY);

app.use(webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath
}));

app.get('/', (req, res) => {
  res.sendFile(`${config.output.path}/index.html`);
})

app.use('/api', (req, res) => {
	client.games({
	    fields: '*', // Return all fields
	    limit: 5, // Limit to 5 results
	    offset: 15 // Index offset for results
	}).then(response => {
	    // response.body contains the parsed JSON response to this query
	    console.log(response);
	}).catch(error => {
	    throw error;
	});

	res.json([{ 'hello': 'world' }]);
})

app.listen(8080, () => {
	console.log('App listening on port 8080');
})