//@flow

export function recordVideo(video) {
  return {
    type: 'RECORD_VIDEO',
    uri: video.uri,
    isSaved: true
  };
}