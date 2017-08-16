// @flow

import Realm from 'realm';

const schema1 = [{
  name: 'Capsule',
  primaryKey: 'id',
  properties: {
    id:             'string',
    uri:            'string',
    status:         'int',
    savedAt:        'string',
    publishedAt:    'string',
    read:           {type: 'bool', default: false}
  }
}]

const schema0 = [{
  name: 'Capsule',
  primaryKey: 'id',
  properties: {
    id:             'string',
    uri:            'string',
    status:         'int',
    savedAt:        'string',
    publishedAt:    'string'
  }
}]

const schemas = [
  {schema: schema0, schemaVersion: 0},
  {schema: schema1, schemaVersion: 1}
];

// Schema version starts at -1 for a fresh installation
let currentSchemaIndex = Realm.schemaVersion(Realm.defaultPath);

// start migrating from the next schema
for (let i = currentSchemaIndex + 1; i < schemas.length; i++) {
  const migratedRealm = new Realm(schemas[i]);
  migratedRealm.close();
}

export default new Realm(schemas[schemas.length-1]);