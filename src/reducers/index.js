/**
 * @flow
 */

import { combineReducers } from 'redux';

import Camera from 'react-native-camera';
import { AppNavigator } from '../containers/AppNavigator';


// =============================================================================
// NAV REDUCER
// The Navigation reducer contains the path information to navigate between
// the screens. Check https://github.com/react-community/react-navigation for
// more information.
// =============================================================================

const firstAction = AppNavigator.router.getActionForPathAndParams('Main');
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
}

// =============================================================================
// Combining all reducers
// =============================================================================

const AppReducer = combineReducers({
  nav
});

export default AppReducer;