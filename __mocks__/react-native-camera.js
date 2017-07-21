import React from 'react';

const constants = constants = {
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

Camera.constants = constants;

export default Camera;