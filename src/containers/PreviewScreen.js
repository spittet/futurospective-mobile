/**
 * This is the preview screen where we play the video after it's been recorded.
 *
 * @flow
 */

import React from 'react';
import { View } from 'react-native';
import RNFS from 'react-native-fs';

import styles from './styles';

import Video from 'react-native-video';

class PreviewScreen extends React.Component {

  player: any;
  video: any;

  static navigationOptions = {
    title: 'Preview Screen',
  };

  constructor(props: Object) {
    super(props);

    this.player = null;
    this.video = null;
  }

  getLastVideo = () => {
    console.log('====================');
    console.log(RNFS.DocumentDirectoryPath);
    RNFS.readDir(RNFS.DocumentDirectoryPath)
      .then((result) => {
        this.video = (result[0].path);
      });
  }

  render() {
    this.getLastVideo();
    return (
      <View style={styles.container}>
        <Video 
          source={{uri:'/var/mobile/Containers/Data/Application/3FBE526A-EA5B-4347-B895-636671B7C45B/Documents/A85DCEED-EE68-4730-8308-F77DFCFEE6CF.mov'}}   // Can be a URL or a local file. 
          ref={(ref) => {
            this.player = ref
          }}
          style={styles.backgroundVideo}
        />
      </View>
    );
  }
}

export default PreviewScreen;