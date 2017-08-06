/**
 * @flow
 */

import { combineReducers } from 'redux';

import nav from './nav';
import newCapsule from './newCapsule';
import capsuleItems from './capsuleItems';

const AppReducer = combineReducers({
  nav,
  newCapsule,
  capsuleItems
});

export default AppReducer;