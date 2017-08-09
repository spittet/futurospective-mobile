import Realm from 'realm';

const schema2 = [{
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

const schema1 = [{
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
  {schema: schema1, schemaVersion: 1},
  {schema: schema2, schemaVersion: 2}
];

let nextSchemaIndex = Realm.schemaVersion(Realm.defaultPath);
while (nextSchemaIndex < schemas.length) {
  const migratedRealm = new Realm(schemas[nextSchemaIndex++]);
  migratedRealm.close();
}

export default new Realm(schemas[schemas.length-1]);