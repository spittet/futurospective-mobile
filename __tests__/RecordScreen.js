/* eslint-env mocha */
/* eslint-disable */

import 'react-native';
import React from 'react';

// Using spittet-enzyme because enzyme doesn't work yet with React 16
import { shallow } from 'spittet-enzyme';
import RecordScreen from '../src/containers/RecordScreen.js';
import sinon from 'sinon';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


/*import 'react-native-mock-render/mock';  

const jsdom = require('jsdom').jsdom;                    
global.document = jsdom('');                             
global.window = document.defaultView;                    
Object.keys(document.defaultView).forEach((property) => {
 if (typeof global[property] === 'undefined') {         
   global[property] = document.defaultView[property];   
 }                                                      
});
*/


jest.mock('react-native-fs', () => 'RNFS');

describe('Testing the rendering of the recording Screen', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <RecordScreen />
    );
  });
  it('renders default component as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('renders the stop button when it\'s recording', () => {
    wrapper.setState({isRecording: true});
    expect(wrapper.find({id: 'stopRecordingButton'})).toHaveLength(1);
  });
  it('starts recording when pressing the recording button', () => {
    
  });
  it('starts a timer when recording starts', () => {

  });
  it('stops recording when timer expires', () => {

  });
  it('stops recording when pressing the stop recording button', () => {

  });
  it('switches camera type when pressing the switch button', () => {

  });
  it('toggle the light when pressing the switch light button', () => {

  });
});