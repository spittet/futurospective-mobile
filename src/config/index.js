// @flow

import RNFS from 'react-native-fs';

export const config = {
  CAPSULES_DIR: RNFS.DocumentDirectoryPath + '/capsules', // Capsules directory
  MAX_RECORDING_DURATION: 10000,                          // Recording timeout
}

export function locapsInit() {
  createCapsulesDirectory();
}

function createCapsulesDirectory() {
  RNFS.exists(config.CAPSULES_DIR).then((result) => {
    if (!result) {
      RNFS.mkdir(config.CAPSULES_DIR);
    } else {
      
    }
  });
}