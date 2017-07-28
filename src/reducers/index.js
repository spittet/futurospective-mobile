/**
 * @flow
 */

import { combineReducers } from 'redux';

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
// RECORDED VIDEO REDUCER
// The recorded video reducer contains the infor related to the video we are
// currently trying to record.
// =============================================================================

const initialRecordedVideoState = {
  uri: null,
  isSaved: false
}
function recordedVideo(state = initialRecordedVideoState, action) {
  let nextState;
  switch (action.type) {
    case 'RECORD_VIDEO':
      return {
        ...state,
        uri: action.uri,
        isSaved: true
      }
    default:
      return state
  }
}

// =============================================================================
// Combining all reducers
// =============================================================================

const AppReducer = combineReducers({
  nav,
  recordedVideo
});

export default AppReducer;