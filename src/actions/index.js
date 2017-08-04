//@flow

import type {Capsule} from '../reducers';

import { config } from '../config';

import { createCapsule } from '../db';
import RNFS from 'react-native-fs';
import moment from 'moment';

import { listFilesInDirsForDebugging } from '../utils';

/**
 * Sets the publishing date of the capsule.
 * Recorded as a timestamp.
 */
export function setNewCapsulePublishDate(publishedAt: string){
  return {
    type: 'SET_NEW_CAPSULE_PUBLISH_DATE',
    publishedAt: publishedAt
  }
}


export function recordNewCapsule(capsule: Capsule) {
  listFilesInDirsForDebugging();
  return {
    type: 'RECORD_NEW_CAPSULE',
    uri: capsule.uri
  };
}

/**
 * Saves the new capsule
 * Before saving the capsule data to the global state we need to move it to the
 * directory where capsules are persisted.
 */
export function saveNewCapsule(capsule: Capsule) {
  // Avoid publishing twice
  if (capsule && capsule.status === config.CAPSULE_STATUS_RECORDED) {
    const videoFilename = capsule.uri.replace(/^.*[\\\/]/, '');
    const newVideoPath = config.CAPSULES_DIR + '/' + videoFilename;
    
    // Need to handle errors
    RNFS.moveFile(capsule.uri, newVideoPath);

    listFilesInDirsForDebugging();

    capsule.savedAt = moment().toISOString();

    createCapsule(capsule);

    return {
      type: 'SAVE_NEW_CAPSULE',
      uri: newVideoPath,
      savedAt: capsule.savedAt
    }
  } else {
    return {
      type: ''
    }
  }
}

/**
 * Publishes the new capsule
 */
export function publishNewCapsule(capsule: Capsule) {
  listFilesInDirsForDebugging();
  // Avoid publishing twice
  if (capsule && capsule.status === config.CAPSULE_STATUS_SAVED) {
    return {
      type: 'PUBLISH_NEW_CAPSULE',
      publishedAt: moment().toISOString()
    }
  } else {
    return {
      type: ''
    }
  }
}

/**
 * Cancels a capsule and deletes the file from disk
 */
export function cancelNewCapsule(capsule: Capsule) {
  if (capsule && capsule.uri) {
    RNFS.unlink(capsule.uri)
      .then(() => {
        // ADD ANALYTICS
      })
      .catch(() => {
        // ADD ANALYTICS
      });
  }
  listFilesInDirsForDebugging();
  return {
    type: 'CANCEL_NEW_CAPSULE'
  }
}