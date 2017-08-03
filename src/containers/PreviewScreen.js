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
import { View, Text, TouchableOpacity } from 'react-native';
import RNFS from 'react-native-fs';

import styles from './styles';

import Video from 'react-native-video';

class PreviewScreen extends React.Component {

  player: any;
  
  state: {
    video: {
      uri: ?string,
      volume: number,
      paused: boolean,
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
        paused: true,
        currentTime: 0.0,
        duration: 0.0,
        resizeMode: "cover"
      }
    }
    this.player = null;
  }

  onLoad = (data) => {
    this.setState({
      video: {
        ...this.state.video,
        duration: data.duration
      }
    });
    this.player.seek(0);
  }

  onProgress = (data) => {
    this.setState({
      video: {
        ...this.state.video,
        currentTime: data.currentTime
      }
    });
  }

  onEnd = () => {
    this.stopPlaying();
  }

  stopPlaying = () => {
    this.setState({
      video: {
        ...this.state.video,
        paused: true
      }
    });
    this.player.seek(0);
  }

  startPlaying = () => {
    this.setState({
      video: {
        ...this.state.video,
        paused: false
      }
    });  
  }

  // I should change this to display an error if we don't have a recorded
  // video.
  render() {
    console.log(this.state);
    if (this.state.video.uri) {
      return (
        <View style={styles.container}>
          <Video 
            source={{uri:this.state.video.uri}}   // Can be a URL or a local file. 
            volume={this.state.video.volume}
            rate={1.0}
            paused={this.state.video.paused}
            resizeMode={this.state.video.resizeMode}
            onLoad={this.onLoad}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            ref={(ref) => {
              this.player = ref
            }}
            style={styles.previewVideoBackground}
          />
          <View style={styles.previewVideoControls}>
          { 
            !this.state.video.paused 
            &&
            <View style={styles.previewVideoPlayButton}>
              <TouchableOpacity onPress={this.stopPlaying}>
                <Text>Stop</Text>
              </TouchableOpacity>
            </View>
            ||
            <View style={styles.previewVideoPlayButton}>
              <TouchableOpacity onPress={this.startPlaying}>
                <Text>Start</Text>
              </TouchableOpacity>
            </View>
          }
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>No recorded video found</Text>
        </View>
      );
    }
    
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