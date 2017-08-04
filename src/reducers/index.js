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
// NEW CAPSULE REDUCER
// The new capsule reducer contains the info related to the capsule we are
// currently trying to publish.
// =============================================================================

export type Capsule = {
  id: ?number;
  uri: string;
  isRecorded: boolean;
  isPublished: boolean
};

const initialNewCapsuleState = {
  uri: null,
  isRecorded: false,
  isPublished: false
}

function newCapsule(state = initialNewCapsuleState, action) {
  switch (action.type) {
    case 'RECORD_NEW_CAPSULE':
      return {
        ...state,
        uri: action.uri,                  // path on disk
        isRecorded: action.isRecorded,    // value will be true
        isPublished: action.isPublished   // value will be false
      }
    case 'PUBLISH_NEW_CAPSULE':
      return {
        ...state,
        uri: action.uri,
        isPublished: true
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