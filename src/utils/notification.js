// @flow

import PushNotification           from 'react-native-push-notification';
import moment                     from 'moment';
/**
 * Schedules a local notification in the future.
 * This function takes an ISODate as parameter because this is the format
 * used to store publishedAt and savedAt.
 * The moment package makes it quite easy to generate ISO dates
 */
export function scheduleNotification(ISODate: string) {

  const scheduleDate = moment(ISODate).toDate();

  PushNotification.localNotificationSchedule({
    message:          "A new capsule is available!",
    date:             scheduleDate,
    number:           1
  });
}