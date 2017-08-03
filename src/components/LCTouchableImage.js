/*
 * This component is used in the Record Screen to display the different
 * touchable buttons in the view.
 *
 * Please make sure you keep it dumb - refrain from adding sophisticated
 * logic to it.
 *
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';
import { 
  TouchableOpacity, 
  Image 
} from 'react-native';

const LCTouchableImage = ({ buttonStyle, buttonAction, imageSrc }: any) => (
  <TouchableOpacity
    style={buttonStyle}
    onPress={buttonAction}
  >
    <Image source={imageSrc} />
  </TouchableOpacity>
);

LCTouchableImage.propTypes = {
  buttonStyle: PropTypes.any,
  buttonAction: PropTypes.func.isRequired,
  imageSrc: PropTypes.number.isRequired
}

export default LCTouchableImage;