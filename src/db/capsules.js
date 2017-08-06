import Realm from 'realm';
import uuidv1 from 'uuid/v1';

class Capsule {
  static get() {
    return realm.objects(Capsule.schema.name)
  }

  static schema = {
    name: 'Capsule',
    primaryKey: 'id',
    properties: {
      id: {type: 'string'},
      uri: {type: 'string'},
      status: {type: 'int'},
      savedAt: {type: 'string'},
      publishedAt: {type: 'string'}
    }
  }
}

const realm = new Realm({schema: [Capsule]});

export const getCapsules = () => {
  const capsules = Capsule.get().sorted('publishedAt', true);

  return capsules;
}

export const createCapsule = (capsule) => {
  realm.write(() => {
    realm.create(Capsule.schema.name, {
      id: uuidv1(),
      uri: capsule.uri,
      status: capsule.status,
      savedAt: capsule.savedAt,
      publishedAt: capsule.publishedAt
    });
  });
}
