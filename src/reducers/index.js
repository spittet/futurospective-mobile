/**
 * @flow
 */

import { combineReducers } from 'redux';

import { AppNavigator } from '../containers/AppNavigator';

import { config } from '../config';


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
// NEW CAPSULE REDUCER
// The new capsule reducer contains the info related to the capsule we are
// currently trying to publish.
// =============================================================================

export type Capsule = {
  id: ?number;              // ID of the capsule
  uri: string;              // Path of the video file
  status: number;            // Status of the capsule
  savedAt: ?number;     // (timestam) When it's been published
  publishedAt: ?number;     // (timestam) When it'll be avaible
};

const initialNewCapsuleState = {
  uri: null,
  status: config.CAPSULE_STATUS_NEW,
  savedAt: null,
  publishedAt: null
}

function newCapsule(state = initialNewCapsuleState, action) {
  switch (action.type) {
    case 'RECORD_NEW_CAPSULE':
      return {
        ...state,
        uri: action.uri,
        status: config.CAPSULE_STATUS_RECORDED,
      }
    case 'SAVE_NEW_CAPSULE':
      return {
        ...state,
        uri: action.uri,
        status: config.CAPSULE_STATUS_SAVED,
        savedAt: action.savedAt
      }
    case 'PUBLISH_NEW_CAPSULE':
      return {
        ...state,
        uri: action.uri,
        status: config.CAPSULE_STATUS_PUBLISHED,
        publishedAt: action.publishedAt
      }
    case 'CANCEL_NEW_CAPSULE':
      return initialNewCapsuleState;
    default:
      return state
  }
}

// =============================================================================
// Combining all reducers
// =============================================================================

const AppReducer = combineReducers({
  nav,
  newCapsule
});

export default AppReducer;