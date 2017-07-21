/* eslint-env mocha */
/* eslint-disable */

import 'react-native';
import React from 'react';
import Index from '../index.android.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native-camera', () => 'Camera');
jest.mock('react-native-fs', () => 'RNFS');

it('renders correctly', () => {
  const tree = renderer.create(
    <Index />
  );
});
