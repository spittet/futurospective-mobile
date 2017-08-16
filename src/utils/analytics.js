/** This is a wrapper around react-native-google-analytics-bridge to make it
 * easier to refactor in the future.
 *
 * @flow
 */

import { config }                 from '../config';
import { 
  GoogleAnalyticsTracker,
  GoogleAnalyticsSettings, 
} from 'react-native-google-analytics-bridge';

GoogleAnalyticsSettings.setDispatchInterval(3);

export function trackScreenView(screen: string){
  const tracker = new GoogleAnalyticsTracker(config.GA_TRACKING_ID);
  GoogleAnalyticsSettings.setDispatchInterval(3);
  tracker.trackScreenView(screen);
}

export function trackEvent(category: string, action: string, options: ?Object) {
  const tracker = new GoogleAnalyticsTracker(config.GA_TRACKING_ID);
  GoogleAnalyticsSettings.setDispatchInterval(3);
  tracker.trackEvent(category, action, options);
}