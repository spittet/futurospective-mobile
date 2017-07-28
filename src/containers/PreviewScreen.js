/**
 * This is the preview screen where we play the video after it's been recorded.
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

  static navigationOptions = {
    title: 'Preview Screen',
  };

  constructor(props: Object) {
    super(props);

    this.player = null;
    this.video = null;
  }

  getLastVideo = () => {
    if (this.props.recordedVideo && this.props.recordedVideo.uri) {
      this.video = this.props.recordedVideo.uri;
    } else return null
  }

  render() {
    this.getLastVideo();
    return (
      <View style={styles.container}>
        <Video 
          source={{uri:this.video}}   // Can be a URL or a local file. 
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
  recordedVideo: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    recordedVideo: state.recordedVideo
  }
}

export default connect(mapStateToProps)(PreviewScreen);