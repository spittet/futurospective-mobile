// @flow

import type {Capsule} from './currentCapsule';

export type CapsuleItems = {
  items: Array<Capsule>;
};

type Action = {
  type: 'GET_CAPSULES',
  items: Array<Capsule>
};

const initialState = {
  items: [],
}

export default function (state: CapsuleItems = initialState, action: Action) {
  switch (action.type) {
    case 'GET_CAPSULES':
      return {
        ...state,
        items: action.items
      }
    default:
      return state
  }
}