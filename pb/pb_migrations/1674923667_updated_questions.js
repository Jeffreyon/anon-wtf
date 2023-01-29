migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zd8kdbnv0ql1qf3")

  // remove
  collection.schema.removeField("4foe8s9n")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zd8kdbnv0ql1qf3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4foe8s9n",
    "name": "belongsTo",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
})
