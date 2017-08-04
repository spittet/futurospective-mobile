//@flow

import type {Capsule} from '../reducers';

import { config } from '../config';

import RNFS from 'react-native-fs';

import { listFilesInDirsForDebugging } from '../utils';


export function recordNewCapsule(capsule: Capsule) {
  listFilesInDirsForDebugging();
  return {
    type: 'RECORD_NEW_CAPSULE',
    uri: capsule.uri,
    isRecorded: capsule.isRecorded,
    isPublished: capsule.isPublished
  };
}

/**
 * Publishes the new capsule
 * Before saving the capsule data to the global state we need to move it to the
 * directory where capsules are persisted.
 */
export function publishNewCapsule(capsule: Capsule) {
  listFilesInDirsForDebugging();
  
  // Avoid publishing twice
  if (capsule && !capsule.isPublished) {
    const videoFilename = capsule.uri.replace(/^.*[\\\/]/, '');
    const newVideoPath = config.CAPSULES_DIR + '/' + videoFilename;
    
    // Need to handle errors
    RNFS.moveFile(capsule.uri, newVideoPath);

    return {
      type: 'PUBLISH_NEW_CAPSULE',
      uri: newVideoPath
    }
  } else {
    return {
      type: 'PUBLISH_NEW_CAPSULE',
      uri: capsule.uri
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
      .catch((err) => {
        // ADD ANALYTICS
      });
  }

  return {
    type: 'CANCEL_NEW_CAPSULE'
  }
}