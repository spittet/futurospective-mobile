// @flow

import { AppNavigator }           from '../containers/AppNavigator';

const firstAction = AppNavigator.router.getActionForPathAndParams('Main');
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

type Action = {
  type: string
};

export default function (state: any = initialNavState, action: Action) {
  let nextState;
  switch (action.type) {
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
}