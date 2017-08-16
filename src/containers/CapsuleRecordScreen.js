/**
 * This is the screen where the user records a capsule
 *
 * BIG WARNING! The timeout is likely to fail if you're using Chrome Debug.
 * Check https://github.com/facebook/react-native/issues/4470 for more details.
 * Instead you should run it on your mobile and everythign should be fine.
 *
 * @flow
 */

import React                      from 'react';
import PropTypes                  from 'prop-types';
import { connect }                from 'react-redux';

import { View }                   from 'react-native';
import Camera                     from 'react-native-camera';
import LCTouchableImage           from '../components/LCTouchableImage';
import Icon                       from 'react-native-vector-icons/Ionicons';
import styles                     from './styles';

import { config }                 from '../config';
import { NavigationActions }      from 'react-navigation';
import { 
  cancelNewCapsule,
  recordNewCapsule, 
}                                 from '../actions';
import type Capsule               from '../reducers';

import utils                      from '../utils';

class CapsuleRecordScreen extends React.Component {

  camera: any;
  
  // Not using Redux global state because we don't need this data elsewhere.
  state: {
    camera: {
      captureAudio:               boolean,
      captureMode:                number,
      aspect:                     number,
      captureTarget:              number,
      type:                       number,
      orientation:                number,
      flashMode:                  number,
      captureQuality:             number
    },
    isRecording:                  boolean,
    recordStoppedByUser:          boolean,
    recordingTimeoutID:           ?number
  };

  static navigationOptions = {
    title: 'Record a new capsule',
  }

  constructor(props: Object) {
    super(props);
    
    this.camera = null;

    this.state = {
      camera: {
        captureAudio:             true,
        captureMode:              Camera.constants.CaptureMode.video,
        aspect:                   Camera.constants.Aspect.fill,
        captureTarget:            Camera.constants.CaptureTarget.temp,
        type:                     Camera.constants.Type.front,
        orientation:              Camera.constants.Orientation.auto,
        flashMode:                Camera.constants.FlashMode.auto,
        captureQuality:           Camera.constants.CaptureQuality.medium
      },
      isRecording:                false,
      recordStoppedByUser:        false,
      recordingTimeoutID:         null
    };
  }

  componentDidMount() {
    utils.trackScreenView('CapsuleRecord');
  }

  // Sets a timeout after which the recording is automatically stop
  _setRecordingTimeout = () => {
    let recordingTimeoutID = setTimeout(() => {
      this._stopRecording();
    }, config.MAX_RECORDING_DURATION);

    this.setState({
      recordingTimeoutID: recordingTimeoutID
    });
  }

  // Clears the recording timeout to prevent leaks
  _clearRecordingTimeout = () => {
    this.state.recordingTimeoutID &&
      clearTimeout(this.state.recordingTimeoutID);
  }

  _startRecording = () => {
    if (this.camera && !this.state.isRecording) {
      
      let captureOptions = {
        mode: this.state.camera.captureMode,
        audio: this.state.camera.captureAudio
      }

      this.camera.capture(captureOptions)
        .then(async (data) => { // Record new video to global state

          this._clearRecordingTimeout();

          let capsule: Capsule = {
            uri: data.path
          };
          
          // If the users presses the back button we don't record video
          if (this.state.recordStoppedByUser) {
            await this.props.dispatch(recordNewCapsule(capsule));

            // Automatically redirects to the Preview page
            this.props.dispatch(
              NavigationActions.navigate({ routeName: 'Preview' })
            ); 
          } else {  // This happens if user presses the back button
            this.props.dispatch(cancelNewCapsule(capsule));
          }
        });

      this._setRecordingTimeout();
      
      this.setState({
        isRecording: true,
        recordStoppedByUser: false
      });    
    }
  }

  _stopRecording = () => {
    if (this.camera && this.state.isRecording) {
      this.setState({ 
        isRecording: false,
        recordStoppedByUser: true   // Video 
      }, () => {
        this.camera.stopCapture();
      });
      
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style=                  {styles.preview}
          aspect=                 {this.state.camera.aspect}
          captureTarget=          {this.state.camera.captureTarget}
          type=                   {this.state.camera.type}
          flashMode=              {this.state.camera.flashMode}
          captureAudio=           {this.state.camera.captureAudio}
          captureQuality=         {this.state.camera.captureQuality}
          onFocusChanged=         {() => {}}
          onZoomChanged=          {() => {}}
          mirrorImage=            {false}
          defaultTouchToFocus
        />
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <View style={styles.buttonsSpace} />
          {
            !this.state.isRecording
            &&
            <Icon 
              name="ios-radio-button-on" 
              size={50} 
              style={styles.recordIcon}
              onPress={() => this._startRecording()}
            />
            ||
            <Icon 
              name="ios-square" 
              size={50} 
              style={styles.stopIcon}
              onPress={() => this._stopRecording()}
            />
          }
        </View>
      </View>
    );
  }
}

CapsuleRecordScreen.propTypes = {
  dispatch:                       PropTypes.func.isRequired,
  currentCapsule:                 PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    currentCapsule: state.currentCapsule
  }
}


export default connect(mapStateToProps)(CapsuleRecordScreen);
