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
// NEW VIDEO REDUCER
// The new video reducer contains the info related to the video we are
// currently trying to publish.
// =============================================================================

export type Video = {
  id: ?number;
  uri: string;
  isRecorded: boolean;
  isPublished: boolean
};

const initialNewVideoState = {
  uri: null,
  isRecorded: false,
  isPublished: false
}
function newVideo(state = initialNewVideoState, action) {
  let nextState;
  switch (action.type) {
    case 'RECORD_VIDEO':
      return {
        ...state,
        uri: action.uri,                  // path on disk
        isRecorded: action.isRecorded,    // value will be true
        isPublished: action.isPublished   // value will be false
      }
    case 'PUBLISH_VIDEO':
      return {
        ...state,
        isPublished: true
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
  newVideo
});

export default AppReducer;