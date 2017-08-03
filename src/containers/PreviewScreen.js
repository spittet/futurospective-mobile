/**
 * This is the preview screen where we play the video after it's been recorded.
 *
 * The user should only get to this screen after recording a vidoe. They can
 * then preview the result prior to saving it for real.
 * 
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { 
  Button, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';
import Video from 'react-native-video';
import styles from './styles';

import { 
  publishNewVideo,
  cancelNewVideo 
} from '../actions';

class PreviewScreen extends React.Component {

  player: any;
  
  state: {
    video: {
      uri: ?string,
      paused: boolean,
      currentTime: number,
      duration: number,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Preview',
      headerLeft:
        <TouchableOpacity
          onPress={() => {
            navigation.state.params.handleCancel();
            navigation.goBack();
          }}
        ><Text>Cancel</Text></TouchableOpacity>,

      headerRight: 
        <Button 
          title='Publish' 
          onPress={() => navigation.state.params.handlePublish()} 
        />
    }
  }

  constructor(props: Object) {
    super(props);

    this.state = {
      video: {
        uri: this.props.newVideo.uri || null,
        paused: true,
        currentTime: 0.0,
        duration: 0.0,
      }
    }
    this.player = null;
  }

  componentDidMount() {
    this.props.navigation.setParams({
      handlePublish: this.publish,
      handleCancel: this.cancel
    });
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

  publish = () => {
    this.props.dispatch(publishNewVideo(this.props.newVideo));
  }

  cancel = () => {
    this.props.dispatch(cancelNewVideo(this.props.newVideo));
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
            source={{uri:this.state.video.uri}} 
            volume={1.0}
            rate={1.0}
            paused={this.state.video.paused}
            resizeMode="cover"
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
  dispatch: PropTypes.func.isRequired,
  newVideo: PropTypes.object,
  navigation: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    newVideo: state.newVideo
  }
}

export default connect(mapStateToProps)(PreviewScreen);