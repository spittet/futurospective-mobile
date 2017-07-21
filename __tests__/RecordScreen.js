/* eslint-env mocha */
/* eslint-disable */

import 'react-native';
import React from 'react';
import RecordScreen from '../src/containers/RecordScreen.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native-fs', () => 'RNFS');

describe('Testing the rendering of the recording Screen', () => {
  it('renders as expected', () => {
    const tree = renderer.create(
      <RecordScreen />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});