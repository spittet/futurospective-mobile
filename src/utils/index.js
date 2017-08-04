// @flow

import RNFS from 'react-native-fs';
import { config } from '../config';
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
          console.log ('.: Listing files in ' + path + ' :.');

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