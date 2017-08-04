//@flow

import type {Video} from '../reducers';

import { config } from '../config';

import RNFS from 'react-native-fs';


export function recordNewVideo(video: Video) {
  return {
    type: 'RECORD_NEW_VIDEO',
    uri: video.uri,
    isRecorded: video.isRecorded,
    isPublished: video.isPublished
  };
}

/**
 * Publishes the new video
 * Before saving the video data to the global state we need to move it to the
 * directory where capsules are persisted.
 */
export function publishNewVideo(video: Video) {

  const videoFilename = video.uri.replace(/^.*[\\\/]/, '');
  const newVideoPath = config.CAPSULES_DIR + '/' + videoFilename;
  
  // Need to handle errors
  RNFS.moveFile(video.uri, newVideoPath);

  return {
    type: 'PUBLISH_NEW_VIDEO',
    uri: newVideoPath
  }
}

/**
 * Cancels a video and deletes the file from disk
 */
export function cancelNewVideo(video: Video) {
  if (video && video.uri) {
    RNFS.unlink(video.uri)
      .then(() => {
        // ADD ANALYTICS
      })
      .catch((err) => {
        // ADD ANALYTICS
      });
  }

  return {
    type: 'CANCEL_NEW_VIDEO'
  }
}