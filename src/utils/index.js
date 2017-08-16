// @flow

import * as analytics             from './analytics';
import * as video                 from './video';
import * as notification          from './notification';

export default {
  ...analytics,
  ...video,
  ...notification
}