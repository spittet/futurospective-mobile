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
    color: '#cccccc'
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
    color: '#5586BD',
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
    backgroundColor: '#5586BD',
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
  recordIcon: {
    padding: 0,
    color: '#E46778',
    textAlign: 'center',
  },
  stopIcon: {
    padding: 0,
    color: '#cccccc',
    textAlign: 'center',
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
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordHelpText: {
    color: 'white',
    fontSize: 20
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
  previewTopButton: {
    marginLeft: 20,
    marginRight: 20,
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
  capsuleListItem: {
    padding: 10,
    flexDirection: 'row',
  },
  capsuleListItemCreated: {
    fontSize: 15,
    color: '#999999',
  },
  capsuleListItemPublished: {
    fontSize: 18,
    color: '#5586BD'
  },
  capsuleListItemNotPublished: {
    fontSize: 18
  },
  capsuleItemText: {
    flex: 1,
    paddingLeft: 10
  },
  capsuleIconDisabled:{
    color: "#cccccc",
  },
  capsuleIconEnabled:{
    color: '#5586BD'
  }
});

export default styles;