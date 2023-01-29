migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zd8kdbnv0ql1qf3")

  // remove
  collection.schema.removeField("hp9ogwbt")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zd8kdbnv0ql1qf3")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hp9ogwbt",
    "name": "replies",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
