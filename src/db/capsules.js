// @flow
import uuidv1 from 'uuid/v1';
import realm from '../config/realm';

import type {Capsule} from '../reducers/currentCapsule';

export const getAllCapsules = () => {
  const capsules = realm.objects('Capsule').sorted('publishedAt', true);
  return capsules;
}

export const getOneCapsule = (id: string) => {
  const capsule = realm.objectForPrimaryKey('Capsule', id);
  return capsule;
}

export const updateCapsule = (capsule: Capsule) => {
  realm.write(() => {
    realm.create('Capsule', capsule, true);
  });
}

export const createCapsule = (capsule: Capsule) => {
  realm.write(() => {
    realm.create('Capsule', {
      ...capsule,
      id: uuidv1()
    });
  });
}

export const deleteAllCapsules = () => {
  const allCapsules = realm.objects('Capsule');
  realm.write(() => {
    realm.delete(allCapsules);
  });
}