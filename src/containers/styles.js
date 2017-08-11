/**
 * Application styles
 * 
 * This file is crap as I haven't spent any time optimizing it.
 * @flow
 */


import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  screenWithMargin: {
    margin: 30,
    flex: 1,
    justifyContent: 'center'
  },
  lightText: {
    color: '#999999'
  },
  homeCapsules:{
    flex: 1,
    justifyContent: 'center'
  },
  homeToolbar:{
    height: 60,
    flexDirection: 'row',
    alignItems:'stretch',
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
  },
  homeToolBarIcon:{
    borderColor: '#000000',
    borderWidth: 0,
    flex: 1,
    padding: 10,
    color: '#666666',
    textAlign: 'center',
  },
  homeCapsulesNoCapsules: {
    margin: 30,
  },
  homeTitle: {
    marginBottom: 30,
  },
  bigText: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'left',
    color: '#333333',
  },
  durationButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10
  },
  durationButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    padding: 20,
    textAlign: 'center',
  },
  bordered: {
    borderWidth: 1
  },
  separator: {
    marginTop: 10,
    marginBottom: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },
  previewVideoBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  previewVideoControls: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    bottom: 30,
    alignItems: 'center',
  },
  previewVideoPlayButton: {
  },
});

export default styles;