/* eslint-env mocha */
/* eslint-disable */

//==============================================================================
//
//     EVERYTHING IS BROKEN - NEED TO REMOVE ENZYME AND START FROM SCRATCH
//
//==============================================================================
import 'react-native';
import React from 'react';

// Using spittet-enzyme because enzyme doesn't work yet with React 16
import { shallow } from 'spittet-enzyme';
import RecordScreen from '../src/containers/RecordScreen.js';
import sinon from 'sinon';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

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

    // Refs do not work with Jest so I have to create a fake reference to be
    // able to test the recording function
    wrapper.instance().camera = {
      capture: jest.fn()
    }
    wrapper.instance().maxRecordingDuration = 1000;
    wrapper.find({id: 'startRecordingButton'}).dive().simulate('press');
    expect(wrapper.state('isRecording')).toBe(true);
  });
});