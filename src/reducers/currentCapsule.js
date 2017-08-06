// @flow

import { config } from '../config';

export type Capsule = {
  id: ?number,              // ID of the capsule
  uri: string,              // Path of the video file
  status: number,           // Status of the capsule
  savedAt: ?string,         // (timestam) When it's been published
  publishedAt: ?string      // (timestam) When it'll be avaible
};

type Action = {
  type: 'SET_NEW_CAPSULE_PUBLISH_DATE',
  publishedAt: string
} | {
  type: 'RECORD_NEW_CAPSULE',
  uri: string
} | {
  type: 'SAVE_NEW_CAPSULE',
  uri: string,
  savedAt: string
} | {
  type: 'PUBLISH_NEW_CAPSULE',
  uri: string
} | {
  type: 'CANCEL_NEW_CAPSULE'
};

const initialState = {
  uri: null,
  status: config.CAPSULE_STATUS_NEW,
  savedAt: null,
  publishedAt: null
}

export default function (state: Object = initialState, action: Action ) {
  switch (action.type) {
    case 'SET_NEW_CAPSULE_PUBLISH_DATE':
      return {
        ...state,
        publishedAt: action.publishedAt
      }
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
        status: config.CAPSULE_STATUS_PUBLISHED
      }
    case 'GET_CAPSULE':
      return action.capsule;
    case 'CANCEL_NEW_CAPSULE':
      return initialState;
    default:
      return state
  }
}