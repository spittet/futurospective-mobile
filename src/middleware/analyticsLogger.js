import utils from '../utils';

export const analyticsLogger = () => {
  return next => action => {

    const actionName = action.type == 'Navigation/NAVIGATE' ?
      action.type + ':' + action.routeName : action.type;

    utils.trackEvent('action', actionName);

    return next(action);
  }
}
