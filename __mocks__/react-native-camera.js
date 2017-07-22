import React from 'react';
import PropTypes from 'prop-types';

const constants = {
  Aspect: {},
  BarCodeType: {},
  Type: {},
  CaptureMode: {},
  CaptureTarget: {},
  CaptureQuality: {},
  Orientation: {},
  FlashMode: {},
  TorchMode: {}
};

class Camera extends React.Component {

  static constants = constants
  render() {
    return React.createElement('Camera', this.props, this.props.children);
  }
}

Camera.propTypes = {
  children: PropTypes.node
}

Camera.constants = constants;

export default Camera;