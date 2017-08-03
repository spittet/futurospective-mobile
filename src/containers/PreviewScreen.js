/**
 * This is the preview screen where we play the video after it's been recorded.
 *
 * The user should only get to this screen after recording a vidoe. They can
 * then preview the result prior to saving it for real.
 * 
 * TODO:
 *   - Remove the use of this.video as we should be using the redux state
 *     instead.
 *
 * 
 *
 * @flow
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import RNFS from 'react-native-fs';

import styles from './styles';

import Video from 'react-native-video';

class PreviewScreen extends React.Component {

  player: any;
  video: any;

  // Navigation Options are used by React Native Navigation
  static navigationOptions = {
    title: 'Preview Screen',
  };

  constructor(props: Object) {
    super(props);

    this.player = null;
    this.video = null;
  }

  // Checks if we have a recorded video in the global state
  getRecordedVideo = () => {
    if (this.props.newVideo && this.props.newVideo.uri) {
      this.video = this.props.newVideo.uri;
    } else return null
  }

  // I should change this to display an error if we don't have a recorded
  // video.
  render() {
    this.getRecordedVideo();
    return (
      <View style={styles.container}>
        <Video 
          source={{uri:this.video}}   // Can be a URL or a local file. 
          volume={1.0}
          muted={false}
          ref={(ref) => {
            this.player = ref
          }}
          style={styles.backgroundVideo}
        />
      </View>
    );
  }
}

PreviewScreen.propTypes = {
  newVideo: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    newVideo: state.newVideo
  }
}

export default connect(mapStateToProps)(PreviewScreen);