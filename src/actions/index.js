//@flow

import type {Capsule} from '../reducers/currentCapsule';

import { config } from '../config';

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

    capsule.uri = newVideoPath;
    capsule.status = config.CAPSULE_STATUS_SAVED;
    capsule.savedAt = moment().toISOString();

    db.createCapsule(capsule);

    console.log('Notification to publish at ');
    console.log(moment(capsule.publishedAt).toDate());
    PushNotification.localNotificationSchedule({
      message: "My Notification Message", // (required)
      date: moment(capsule.publishedAt).toDate() // in 60 secs
    });

    PushNotification.localNotificationSchedule({
      message: "My Notification Message", // (required)
      date: new Date(Date.now() + (60 * 1000)) // in 60 secs
    });

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