//@flow

import type {Capsule} from '../reducers/currentCapsule';

import { config } from '../config';

import db from '../db';

import RNFS from 'react-native-fs';
import moment from 'moment';

import { listFilesInDirsForDebugging } from '../utils';

import PushNotification  from 'react-native-push-notification';

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


function scheduleNotification(ISODate: string) {

  const scheduleDate = moment(ISODate).toDate();

  PushNotification.localNotificationSchedule({
    message: "A new capsule is available!",
    date: scheduleDate
  });
}

function persistVideoFile(uri: string) {
  const videoFilename = uri.replace(/^.*[\\\/]/, '');
  const newUri = config.CAPSULES_DIR + '/' + videoFilename;

  RNFS.moveFile(uri, newUri);

  return newUri;
}

/**
 * Saves the new capsule
 * Before saving the capsule data to the global state we need to move it to the
 * directory where capsules are persisted.
 */
export function saveNewCapsule(capsule: Capsule) {
  // Avoid publishing twice
  if (capsule && capsule.status === config.CAPSULE_STATUS_RECORDED) {
    capsule.uri = persistVideoFile(capsule.uri);
    capsule.status = config.CAPSULE_STATUS_SAVED;
    capsule.savedAt = moment().toISOString();

    db.createCapsule(capsule);

    scheduleNotification(capsule.publishedAt);

    return {
      type: 'SAVE_NEW_CAPSULE',
      uri: capsule.uri,
      status: capsule.status,
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

/**
 * Get the list of capsules
 */
export function getCapsules() {
  const capsules = db.getCapsules();
  return {
    type: 'GET_CAPSULES',
    items: capsules
  }

}

/**
 * View a capsule
 */
export function getCapsule(id: string){
  const result = db.getCapsule(id);
  const capsule: Capsule = {
    id: result.id,
    uri: result.uri,
    status: result.status,
    publishedAt: result.publishedAt,
    savedAt: result.savedAt
  } 
  return {
    type: 'GET_CAPSULE',
    capsule: capsule
  }

}