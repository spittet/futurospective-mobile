/**
 * Preview screen where we play the capsule after it's been recorded.
 *
 * The user should only get to this screen after recording a capsule. They can
 * then preview the result prior to saving it for real.
 * 
 * @flow
 */

import React                      from 'react';
import PropTypes                  from 'prop-types';
import { connect }                from 'react-redux';

import { 
  Button, 
  Text, 
  TouchableOpacity, 
  View 
}                                 from 'react-native';
import Icon                       from 'react-native-vector-icons/Ionicons';
import Video                      from 'react-native-video';
import styles                     from './styles';

import { 
  saveNewCapsule,
  cancelNewCapsule 
}                                 from '../actions';
import { NavigationActions }      from 'react-navigation';

class PreviewScreen extends React.Component {

  player: any;
  
  // We use a video object in the local state for the video player in the
  // screen.
  state: {
    video: {
      uri:            ?string,
      paused:         boolean,
      currentTime:    number,
      duration:       number,
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
        <Icon
          name="ios-close"
          size={40}
          style={styles.previewTopButton}
          onPress={() => {
            navigation.state.params.handleCancel();
            navigation.goBack(); 
          }}
        />,
      headerRight: 
        <View style={styles.previewTopButton}>
          <Button 
            title='Save' 
            onPress={() => navigation.state.params.handleSave()} 
          />
        </View>
    }
  };

  constructor(props: Object) {
    super(props);
    this._initLocalState();
    
  }

  _initLocalState = () => {
    this.state = {
      video: {
        uri:          this.props.currentCapsule.uri || null,
        paused:       true,
        currentTime:  0.0,
        duration:     0.0,
      }
    }
    this.player = null;
  }

  componentDidMount() {
    this.props.navigation.setParams({
      handleSave: this._saveCapsule,
      handleCancel: this._cancelCapsule
    });
  }

  _onVideoLoad = (data) => {
    this.setState({
      video: {
        ...this.state.video,
        duration: data.duration
      }
    });
    this.player.seek(0);
  }

  _onVideoProgress = (data) => {
    this.setState({
      video: {
        ...this.state.video,
        currentTime: data.currentTime
      }
    });
  }

  _saveCapsule = async () => {
    await this.props.dispatch(saveNewCapsule(this.props.currentCapsule));

    this._navigateBackToHome(); 
  }

  _cancelCapsule = () => {
    this.props.dispatch(cancelNewCapsule(this.props.currentCapsule));
  }

  _navigateBackToHome = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Main'})
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  _onVideoEnd = () => {
    this._stopPlaying();
  }

  _stopPlaying = () => {
    this.setState({
      video: {
        ...this.state.video,
        paused: true
      }
    });
    this.player.seek(0);
  }

  _startPlaying = () => {
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
            source=       {{uri:this.state.video.uri}} 
            volume=       {1.0}
            rate=         {1.0}
            paused=       {this.state.video.paused}
            resizeMode=   "cover"
            onLoad=       {this._onVideoLoad}
            onProgress=   {this._onVideoProgress}
            onEnd=        {this._onVideoEnd}
            ref=          {(ref) => {this.player = ref}}
            style=        {styles.preview}
          />
          <View style={[styles.overlay, styles.bottomOverlay]}>
            <View style={styles.buttonsSpace} />
            { 
              !this.state.video.paused 
              &&
              <Icon 
                name="ios-square" 
                size={50} 
                style={styles.stopIcon}
                onPress={() => this._stopPlaying()}
              />
              ||
              <Icon 
                name="ios-play-outline" 
                size={50} 
                style={styles.stopIcon}
                onPress={() => this._startPlaying()}
              />
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
  dispatch:         PropTypes.func.isRequired,
  currentCapsule:   PropTypes.object,
  navigation:       PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    currentCapsule: state.currentCapsule
  }
}

export default connect(mapStateToProps)(PreviewScreen);