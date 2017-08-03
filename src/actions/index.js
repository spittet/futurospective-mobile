//@flow

import type {Video} from '../reducers';

export function recordVideo(video: Video) {
  return {
    type: 'RECORD_VIDEO',
    uri: video.uri,
    isRecorded: video.isRecorded,
    isPublished: video.isPublished
  };
}