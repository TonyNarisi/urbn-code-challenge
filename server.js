const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath
}));

app.get('/', (req, res) => {
  res.sendFile(`${config.output.path}/index.html`);
})

app.use('/api', (req, res) => {
	res.json([{ 'hello': 'world' }]);
})

app.listen(8080, () => {
	console.log('App listening on port 8080');
})