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
  
  state: {
    video: {
      uri: ?string,
      volume: number,
      rate: number,
      currentTime: number,
      duration: number,
      resizeMode: string
    }
  }

  // Navigation Options are used by React Native Navigation
  static navigationOptions = {
    title: 'Preview Screen',
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      video: {
        uri: this.props.newVideo.uri || null,
        volume: 1,
        rate: 1,
        currentTime: 0.0,
        duration: 0.0,
        resizeMode: "cover"
      }
    }
    this.player = null;
  }

  // I should change this to display an error if we don't have a recorded
  // video.
  render() {
    return (
      <View style={styles.container}>
        <Video 
          source={{uri:this.state.video.uri}}   // Can be a URL or a local file. 
          volume={this.state.video.volume}
          rate={this.state.video.rate}
          resizeMode={this.state.video.resizeMode}
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