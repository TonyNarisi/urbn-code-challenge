import { combineReducers } from 'redux';
import dictionaries from './dictionaries.js';
import searchData from './search.js';
import similarGameData from './similar_games.js';

const appStore = combineReducers({
  dictionaries,
  searchData,
  similarGameData
})

export default appStore;