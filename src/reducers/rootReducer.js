/*
 src/reducers/rootReducer.js
*/

import { combineReducers } from 'redux';
import modelReducer from './modelReducer';
import browseReducer from './browseReducer';
import readReducer from './readReducer';

export default combineReducers({ 
	model: modelReducer,
	browsing: browseReducer,
	reading: readReducer
});