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
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Camera from 'react-native-camera';
import LCTouchableImage from '../components/LCTouchableImage'
import RNFS from 'react-native-fs';

import { NavigationActions } from 'react-navigation';

import { recordVideo } from '../actions';

import type Video from '../reducers';

import { MAX_RECORDING_DURATION } from '../config';

import styles from './styles';

class RecordScreen extends React.Component {

  camera: any;
  maxRecordingDuration: number;

  // This is the local state of the RecordScreen. We're not using Redux global
  // state because none of this data matters outside of that screen.
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

  // Navigation Options are used by React Native Navigation
  static navigationOptions = {
    title: 'Record Screen',
  }

  constructor(props: Object) {
    super(props);
    
    this.camera = null;
    
    // Number of seconds before timing out
    this.maxRecordingDuration = MAX_RECORDING_DURATION; 

    this.state = {
      camera: {
        captureAudio: true,
        captureMode: Camera.constants.CaptureMode.video,
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.disk,
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
    // Clearing the timer to prevent leaks when component is unmounted.
    this.clearRecordingTimer();
  }

  startRecording = () => {

    if (this.camera) {
      // start by deleting previously recorded video.
      this.deleteOldFiles();


      let captureOptions = {
        mode: this.state.camera.captureMode,
        audio: this.state.camera.captureAudio
      }

      // When the recording ends we dispatch an event to save the metadata in
      // the global state.
      this.camera.capture(captureOptions)
        .then(async (data) => {
          let video: Video = {
            id: null,
            uri: data.path,
            isRecorded: true,
            isPublished: false
          };

          // Record the video in the global state. We wait for it to be
          // finalised before redirecting to the Preview video screen
          await this.props.dispatch(recordVideo(video));

          this.props.dispatch(
            NavigationActions.navigate({ routeName: 'Preview' })
          ); 
        });

      // This function will automatically stop recording after a certain
      // timeout expires.
      this.setRecordingTimer();
      
      this.setState({
        isRecording: true
      });
    }
  }

  setRecordingTimer = () => {
    let recordingTimeoutID = setTimeout(() => {
      this.stopRecording();
    }, this.maxRecordingDuration);

    this.setState({
      recordingTimeoutID: recordingTimeoutID
    });
  }

  // We use this function to make sure that we clear the timeout timer. It's
  // used when we stop the recording and when we leave the screen.
  clearRecordingTimer = () => {
    this.state.recordingTimeoutID &&
      clearTimeout(this.state.recordingTimeoutID);
  }

  stopRecording = () => {

    if (this.camera) {
      this.camera.stopCapture();
      
      this.clearRecordingTimer();

      this.setState({
        isRecording: false
      });
    }
  }

  switchType = () => {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    // Duplicating object to keep state immutable.
    // See http://redux.js.org/docs/recipes/UsingObjectSpreadOperator.html
    // Note: I'm adding this to the doc because I keep forgetting.
    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  }

  get typeIcon(): any {
    let icon;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      icon = require('../assets/ic_camera_rear_white.png');
    } else if (this.state.camera.type === front) {
      icon = require('../assets/ic_camera_front_white.png');
    }

    return icon;
  }

  switchFlash = () => {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  }

  // I'm using this function to clean up the directory before saving a new 
  // video. This is to avoid having a huge app.
  deleteOldFiles = () => {
    RNFS.readDir(RNFS.DocumentDirectoryPath)
      .then((result) => {
        for (let doc of result) {
          doc['path'] && RNFS.unlink(doc['path']);
        }
      });
  }

  get flashIcon(): any {
    let icon;
    const { auto, on, off } = Camera.constants.FlashMode;
    if (this.state.camera.flashMode === auto) {
      icon = require('../assets/ic_flash_auto_white.png');
    } else if (this.state.camera.flashMode === on) {
      icon = require('../assets/ic_flash_on_white.png');
    } else if (this.state.camera.flashMode === off) {
      icon = require('../assets/ic_flash_off_white.png');
    }

    return icon;
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
        <View style={[styles.overlay, styles.topOverlay]}>
          <LCTouchableImage 
            id="switchTypeButton"
            buttonStyle={styles.typeButton}
            buttonAction={this.switchType}
            imageSrc={this.typeIcon}
          />
          <LCTouchableImage 
            id="switchFlashButton"
            buttonStyle={styles.flashButton}
            buttonAction={this.switchFlash}
            imageSrc={this.flashIcon}
          />
        </View>
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
