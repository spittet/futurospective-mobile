/**
 * @flow
 */

import { combineReducers } from 'redux';

import nav from './nav';
import currentCapsule from './currentCapsule';
import capsuleItems from './capsuleItems';

const AppReducer = combineReducers({
  nav,
  currentCapsule,
  capsuleItems
});

export default AppReducer;