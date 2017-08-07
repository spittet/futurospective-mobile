//@flow

import type {Capsule} from '../reducers/currentCapsule';

import { config } from '../config';
import { clearVideos } from '../utils';

import db from '../db';

import RNFS from 'react-native-fs';
import moment from 'moment';

import { listFilesInDirsForDebugging } from '../utils';

import PushNotification  from 'react-native-push-notification';

PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        console.log( 'TOKEN:', token );
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
    },

    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: "YOUR GCM SENDER ID",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
    requestPermissions: true,
});

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
    date: scheduleDate,
    number: 1
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

    // Run the cleanup to make sure we keep disk space to min
    clearVideos();

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