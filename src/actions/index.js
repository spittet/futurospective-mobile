//@flow

import type {Video} from '../reducers';

import { CAPSULES_DIR } from '../config';

import RNFS from 'react-native-fs';


export function recordNewVideo(video: Video) {
  return {
    type: 'RECORD_NEW_VIDEO',
    uri: video.uri,
    isRecorded: video.isRecorded,
    isPublished: video.isPublished
  };
}

export function publishNewVideo(video: Video) {
  console.log (CAPSULES_DIR);
  // Implement feature to move the video

  let filename = video.uri.replace(/^.*[\\\/]/, '');
  let newPath = CAPSULES_DIR + '/' + filename;
  
  RNFS.moveFile(video.uri, newPath);
  return {
    type: 'PUBLISH_NEW_VIDEO',
    uri: newPath
  }
}

export function cancelNewVideo(video: Video) {
  RNFS.unlink(video.uri);
  return {
    type: 'CANCEL_NEW_VIDEO'
  }
}