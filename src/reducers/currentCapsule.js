// @flow

import { config } from '../config';

export type Capsule = {
  id:                 ?number,     // ID of the capsule
  uri:                string,      // Path of the video file
  status:             number,      // Status of the capsule
  savedAt:            string,      // (timestamp) When it's been saved
  publishedAt:        string,      // (timestamp) When it'll be avaible
  read:               boolean      // User has read status
};

type Action = {
  type:               'SET_NEW_CAPSULE_PUBLISH_DATE',
  publishedAt:        string
} | {
  type:               'RECORD_NEW_CAPSULE',
  uri:                string
} | {
  type:               'SAVE_NEW_CAPSULE',
  uri:                string,
  status:             string,
  savedAt:            string
} | {
  type:               'PUBLISH_NEW_CAPSULE',
  uri:                string
} | {
  type:               'CANCEL_NEW_CAPSULE'
} | {
  type:               'MARK_CAPSULE_AS_READ',
  capsule:            Capsule
};

const initialState = {
  uri:                null,
  status:             config.CAPSULE_STATUS_NEW,
  savedAt:            null,
  publishedAt:        null,
  read:               false
}

export default function (state: Object = initialState, action: Action ) {
  switch (action.type) {
    case 'SET_NEW_CAPSULE_PUBLISH_DATE':
      return {
        ...state,
        publishedAt:  action.publishedAt
      }
    case 'RECORD_NEW_CAPSULE':
      return {
        ...state,
        uri:          action.uri,
        status:       config.CAPSULE_STATUS_RECORDED,
      }
    case 'SAVE_NEW_CAPSULE':
      return {
        ...state,
        uri:          action.uri,
        status:       action.status,
        savedAt:      action.savedAt
      }
    case 'PUBLISH_NEW_CAPSULE':
      return {
        ...state,
        uri:          action.uri,
        status:       config.CAPSULE_STATUS_PUBLISHED
      }
    case 'GET_CAPSULE':
      return action.capsule;
    case 'MARK_CAPSULE_AS_READ':
      return action.capsule;
    case 'CANCEL_NEW_CAPSULE':
      return initialState;
    default:
      return state
  }
}