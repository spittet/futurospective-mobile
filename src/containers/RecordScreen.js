/**
 * This is the screen where the user records a capsule
 *
 * BIG WARNING! The timeout is likely to fail if you're using Chrome Debug.
 * Check https://github.com/facebook/react-native/issues/4470 for more details.
 * Instead you should run it on your mobile and everythign should be fine.
 *
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { View } from 'react-native';
import Camera from 'react-native-camera';
import LCTouchableImage from '../components/LCTouchableImage'
import styles from './styles';

import { config } from '../config';
import { NavigationActions } from 'react-navigation';
import { recordNewVideo } from '../actions';
import type Video from '../reducers';

class RecordScreen extends React.Component {

  camera: any;
  
  // Not using Redux global state because we don't need this data elsewhere.
  state: {
    camera: {
      captureAudio: boolean,
      captureMode: number,
      aspect: number,
      captureTarget: number,
      type: number,
      orientation: number,
      flashMode: number,
      captureQuality: number
    },
    isRecording: boolean,
    recordingTimeoutID: ?number
  };

  static navigationOptions = {
    title: 'Record Screen',
  }

  constructor(props: Object) {
    super(props);
    
    this.camera = null;

    this.state = {
      camera: {
        captureAudio: true,
        captureMode: Camera.constants.CaptureMode.video,
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.temp,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
        captureQuality: Camera.constants.CaptureQuality.medium
      },
      isRecording: false,
      recordingTimeoutID: null
    };
  }


  componentWillUnmount() {
    this.stopRecording();
  }

  // Sets a timeout after which the recording is automatically stop
  setRecordingTimeout = () => {
    let recordingTimeoutID = setTimeout(() => {
      this.stopRecording();
    }, config.MAX_RECORDING_DURATION);

    this.setState({
      recordingTimeoutID: recordingTimeoutID
    });
  }

  // Clears the recording timeout to prevent leaks
  clearRecordingTimeout = () => {
    this.state.recordingTimeoutID &&
      clearTimeout(this.state.recordingTimeoutID);
  }

  startRecording = () => {
    if (this.camera && !this.state.isRecording) {
      let captureOptions = {
        mode: this.state.camera.captureMode,
        audio: this.state.camera.captureAudio
      }

      this.camera.capture(captureOptions)
        .then(async (data) => { // Record new video to global state
          let video: Video = {
            id: null,
            uri: data.path,
            isRecorded: true,
            isPublished: false
          };

          await this.props.dispatch(recordNewVideo(video));

          // Automatically redirects to the Preview page
          this.props.dispatch(
            NavigationActions.navigate({ routeName: 'Preview' })
          ); 
        });

      this.setRecordingTimeout();
      
      this.setState({
        isRecording: true
      });
    }
  }

  stopRecording = () => {
    if (this.camera && this.state.isRecording) {
      this.camera.stopCapture();
      this.clearRecordingTimeout();
      this.setState({ isRecording: false });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          captureAudio={this.state.camera.captureAudio}
          captureQuality={this.state.camera.captureQuality}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          defaultTouchToFocus
          mirrorImage={false}
        />
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <View style={styles.buttonsSpace} />
          {
            !this.state.isRecording
            &&
            <LCTouchableImage
              id="startRecordingButton"
              buttonStyle={styles.captureButton}
              buttonAction={this.startRecording}
              imageSrc={require('../assets/ic_videocam_36pt.png')}
            />
            ||
            <LCTouchableImage 
              id="stopRecordingButton"
              buttonStyle={styles.captureButton}
              buttonAction={this.stopRecording}
              imageSrc={require('../assets/ic_stop_36pt.png')}
            />
          }
        </View>
      </View>
    );
  }
}

RecordScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  newVideo: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    newVideo: state.newVideo
  }
}


export default connect(mapStateToProps)(RecordScreen);
