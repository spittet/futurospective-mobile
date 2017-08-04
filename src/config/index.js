// @flow

import RNFS from 'react-native-fs';

export const config = {
  CAPSULES_DIR:                        // Capsules directory
    RNFS.DocumentDirectoryPath 
    + '/capsules', 
  MAX_RECORDING_DURATION: 10000,       // Recording timeout
  CAPSULE_STATUS_NEW: 0,                // Initial state of a new capsule
  CAPSULE_STATUS_RECORDED: 1,           // Recorded state for previews
  CAPSULE_STATUS_SAVED: 2,              // Capsule is persisted
  CAPSULE_STATUS_PUBLISHED: 3           // Capsule is available to user
}

export function locapsInit() {
  createCapsulesDirectory();
}

function createCapsulesDirectory() {
  RNFS.exists(config.CAPSULES_DIR).then((result) => {
    if (!result) {
      RNFS.mkdir(config.CAPSULES_DIR);
    } else {
      // ADD ANALYTICS
    }
  });
}