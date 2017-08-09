// @flow

import RNFS from 'react-native-fs';
import { config } from '../config';
import db from '../db';

/**
 * This function is just a debug helpers to make sure that videos are properly
 * cleaned up
 *
 */
export function listFilesInDirsForDebugging(){
  const directories = [
    RNFS.DocumentDirectoryPath,
    RNFS.CachesDirectoryPath,
    RNFS.TemporaryDirectoryPath,
    RNFS.ExternalDirectoryPath,
    config.CAPSULES_DIR 
  ]
  /* eslint-disable no-alert, no-console */

  for (let path of directories) {
    if (path) {
      RNFS.readDir(path)
        .then((result) => {
          console.log ('= ' + result.length + ' files in ' + path + ' =======');
          for (let doc of result) {
            console.log(doc['path']);
          } 
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  /* eslint-enable no-alert, no-console */
}

// Move a video from cache to the CAPSULE_DIR folder
export function persistVideoFile(uri: string) {
  const videoFilename = uri.replace(/^.*[\\\/]/, '');
  const newUri = config.CAPSULES_DIR + '/' + videoFilename;

  RNFS.moveFile(uri, newUri);

  return newUri;
}

export function clearVideos(){
  clearCacheDirectory();
  clearCapsuleDirectory();
}

// Remove videos from the cached dir
function clearCacheDirectory(){
  const cacheDirectory = RNFS.CachesDirectoryPath;

  RNFS.readDir(cacheDirectory)
    .then((result) => {
      for (let doc of result) {
        RNFS.unlink(doc['path']);
      } 
    })
    .catch((err) => {
      /* eslint-disable no-alert, no-console */
      console.log(err);
      /* eslint-enable no-alert, no-console */
    }); 
}

// Remove videos that are not saved in the DB
function clearCapsuleDirectory(){
  const allCapsules = db.getAllCapsules();
  
  const videoPaths = [];
  for (let i = 0; i < allCapsules.length; i++){
    videoPaths.push(allCapsules[i].uri);
  }
  
  RNFS.readDir(config.CAPSULES_DIR)
    .then((result) => {
      for (let doc of result) {
        // Unlink video if it's not part of the DB vids
        if (videoPaths.indexOf(doc['path']) == -1)
          RNFS.unlink(doc['path']);
      } 
    })
    .catch((err) => {
      /* eslint-disable no-alert, no-console */
      console.log(err);
      /* eslint-enable no-alert, no-console */
    });

}