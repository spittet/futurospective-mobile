/* eslint-env mocha */
/* eslint-disable */

import 'react-native';
import React from 'react';
//import ReactTestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import RecordScreen from '../src/containers/RecordScreen.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native-fs', () => 'RNFS');

describe('Testing the rendering of the recording Screen', () => {
  it('renders default component as expected', () => {
    const wrapper = shallow(
      <RecordScreen />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('renders the stop button when it\'s recording', () => {
    const wrapper = shallow(
      <RecordScreen />
    );
    wrapper.setState({isRecording: true});
    expect(wrapper.find({id: 'stopRecordingButton'})).toHaveLength(1);
  });
});