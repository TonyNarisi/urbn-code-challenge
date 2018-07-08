const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);
const bodyParser = require('body-parser');

const igdb = require('igdb-api-node').default;
const API_KEY = '8304f6f7976ed1399b55412a9acadeca';
const client = igdb(API_KEY);

app.use(bodyParser.json());
app.use(webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath
}));

app.get('/', (req, res) => {
  res.sendFile(`${config.output.path}/index.html`);
})

app.use('/api/search', (req, res) => {
	let searchTerm = req.body.term;
	let limit = req.body.limit;
	let offset = req.body.offset;
	client.games({
    fields: '*',
		// Sort by popularity to increase chance of what user actually meant showing up
    order: 'popularity:desc',
    limit: limit,
    offset: offset,
    search: searchTerm
	}).then(response => {
		res.json({ data: response });
	}).catch(err => {
		res.json({ data: { error: err } });
	});
})

app.use('/api/genres', (req, res) => {
	client.genres({
		fields: 'id,name,slug,url,created_at,updated_at',
		limit: 50
	})
	.then(response => {
		console.log(response);
		res.json({ data: response });
	})
	.catch(err => {
		console.log(err);
		res.json({ data: { error: err } });
	})
})

app.use('/api/themes', (req, res) => {
	client.themes({
		fields: 'id,name,slug,url,created_at,updated_at',
		limit: 50
	})
	.then(response => {
		res.json({ data: response });
	})
	.catch(err => {
		console.log(err)
		res.json({ data: { error: err } })
	})
})

app.listen(8080, () => {
	console.log('App listening on port 8080');
})