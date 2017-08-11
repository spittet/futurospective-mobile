// @flow

import RNFS                       from 'react-native-fs';
import { config }                 from '../config';
import db                         from '../db';
import moment                     from 'moment';

/* eslint-disable no-alert, no-console */

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

export function generateFakeCapsules(){
  const futureCapsule = {
    id: null,
    uri:              'bla',
    status:           2,
    publishedAt:      moment().add(1, 'M').toISOString(),
    savedAt:          moment().subtract(1, 'M').toISOString(),
    read:             false
  }
  const pastUnreadCapsule = {
    id: null,
    uri:              'bla',
    status:           2,
    publishedAt:      moment().subtract(1, 'M').toISOString(),
    savedAt:          moment().subtract(23, 'd').toISOString(),
    read:             false
  }
  const pastReadCapsule = {
    id: null,
    uri:              'bla',
    status:           2,
    publishedAt:      moment().subtract(2, 'Y').toISOString(),
    savedAt:          moment().subtract(13, 'd').toISOString(),
    read:             true
  }
  db.createCapsule(futureCapsule);
  db.createCapsule(futureCapsule);
  db.createCapsule(futureCapsule);
  db.createCapsule(pastUnreadCapsule);
  db.createCapsule(pastUnreadCapsule);
  db.createCapsule(pastUnreadCapsule);
  db.createCapsule(pastReadCapsule);
  db.createCapsule(pastReadCapsule);
  db.createCapsule(pastReadCapsule);
}

// Remove videos from the cached dir
function clearCacheDirectory(){
  const cacheDirectory = RNFS.CachesDirectoryPath;

  RNFS.readDir(cacheDirectory)
    .then((result) => {
      for (let doc of result) {
        RNFS.unlink(doc['path'])
          .catch((err) => {
            console.log(err);
          });
      } 
    })
    .catch((err) => {
      console.log(err);
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
          RNFS.unlink(doc['path'])
            .catch((err) => {
              console.log(err);
            });
      } 
    })
    .catch((err) => {
      console.log(err);
    });

}

//Reset DB
export function resetCapsules(){
  const allCapsules = db.getAllCapsules();

  for (let i = 0; i < allCapsules.length; i++){
    RNFS.unlink(allCapsules[i].uri)
      .catch((err) => {
        console.log(err);
      });
  }

  db.deleteAllCapsules();
}