/**
 * Preview screen where we play the capsule after it's been recorded.
 *
 * The user should only get to this screen after recording a capsule. They can
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
  saveNewCapsule,
  cancelNewCapsule 
} from '../actions';
import { NavigationActions } from 'react-navigation';

class PreviewScreen extends React.Component {

  player: any;
  
  // We use a video object in the local state for the video player in the
  // screen.
  state: {
    video: {
      uri: ?string,
      paused: boolean,
      currentTime: number,
      duration: number,
    }
  }

  /**
   * Changing the default header
   * React Navigation doesn't allow you to use the state right away so this is
   * a workaround. 
   * See https://github.com/react-community/react-navigation/issues/145 for
   * more details.
   */
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
          title='Save' 
          onPress={() => navigation.state.params.handleSave()} 
        />
    }
  }

  constructor(props: Object) {
    super(props);

    this.state = {
      video: {
        uri: this.props.newCapsule.uri || null,
        paused: true,
        currentTime: 0.0,
        duration: 0.0,
      }
    }
    this.player = null;
  }

  componentDidMount() {
    this.props.navigation.setParams({
      handleSave: this.saveCapsule,
      handleCancel: this.cancelCapsule
    });
  }

  onVideoLoad = (data) => {
    this.setState({
      video: {
        ...this.state.video,
        duration: data.duration
      }
    });
    this.player.seek(0);
  }

  onVideoProgress = (data) => {
    this.setState({
      video: {
        ...this.state.video,
        currentTime: data.currentTime
      }
    });
  }

  saveCapsule = async () => {
    await this.props.dispatch(saveNewCapsule(this.props.newCapsule));

    this.navigateBackToHome(); 
  }

  navigateBackToHome = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Main'})
      ]
    })
    this.props.navigation.dispatch(resetAction)


  }

  cancelCapsule = () => {
    this.props.dispatch(cancelNewCapsule(this.props.newCapsule));
  }

  onVideoEnd = () => {
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

  render() {
    if (this.state.video.uri) {
      return (
        <View style={styles.container}>
          <Video 
            source={{uri:this.state.video.uri}} 
            volume={1.0}
            rate={1.0}
            paused={this.state.video.paused}
            resizeMode="cover"
            onLoad={this.onVideoLoad}
            onProgress={this.onVideoProgress}
            onEnd={this.onVideoEnd}
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
          <Text>No recorded capsule found</Text>
        </View>
      );
    }
    
  }
}

PreviewScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  newCapsule: PropTypes.object,
  navigation: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    newCapsule: state.newCapsule
  }
}

export default connect(mapStateToProps)(PreviewScreen);