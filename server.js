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

const tagCreation = (typeId, item) => {
  let tagNumber = typeId << 28;
  tagNumber |= item;
  return tagNumber;
}

app.use(bodyParser.json());
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.get('/', (req, res) => {
  res.sendFile(`${config.output.path}/index.html`);
})

// Right now, the codebase only supports users beginning the flow at the root, so we redirect all React Router-rendered routes to root
app.get('/search-results', (req, res) => {
  res.redirect('/');
})

app.get('/game-details', (req, res) => {
  res.redirect('/');
})

app.get('/similar-results', (req, res) => {
  res.redirect('/');
})

app.get('/similar-game', (req, res) => {
  res.redirect('/');
})

app.use('/api/search', (req, res) => {
  let searchTerm = req.body.term;
  let limit = req.body.limit;
  let offset = req.body.offset;
  client.games({
    fields: 'cover,developers,game_modes,games,genres,id,name,platforms,player_perspectives,storyline,summary,keywords,themes,time_to_beat,total_rating',
    // Sort by popularity to increase chance of what user actually meant showing up
    order: 'popularity:desc',
    limit: limit,
    offset: offset,
    search: searchTerm
  })
  .then(response => {
    res.json({ data: response });
  })
  .catch(err => {
    res.json({ data: { error: true } });
  });
})

app.use('/api/similar', (req, res) => {
  let genres = req.body.genres;
  let themes = req.body.themes
  let perspectives = req.body.perspectives;
  var tags = [];
  genres.map(genre => {
    tags.push(tagCreation(1, genre));
  })
  themes.map(theme => {
    tags.push(tagCreation(0, theme));
  })
  perspectives.map(perspective => {
    tags.push(tagCreation(4, perspective));
  })
  client.games({
    // The format needed for this differs than the docs show, consider changing to a raw request without SDK
    filters: {
      'tags][in': tags.join(',')
    },
    fields: 'cover,developers,game_modes,games,genres,id,name,platforms,player_perspectives,storyline,summary,keywords,themes,time_to_beat,total_rating',
    limit: 12,
    offset: 0,
    order: 'popularity:desc'
  })
  .then(response => {
    res.json({ data: response });
  })
  .catch(err => {
    res.json({ data: { error: true } });
  })


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
    res.json({ data: { error: true } });
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
    res.json({ data: { error: true } })
  })
})

app.use('/api/perspectives', (req, res) => {
  client.player_perspectives({
    fields: 'id,name,slug,url,created_at,updated_at',
    limit: 50
  })
  .then(response => {
    res.json({ data: response });
  })
  .catch(err => {
    console.log(err)
    res.json({ data: { error: true } })
  })
})

app.listen(8080, () => {
  console.log('App listening on port 8080\nWaiting for bundle to finish...');
})