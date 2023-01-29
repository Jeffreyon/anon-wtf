migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zd8kdbnv0ql1qf3")

  collection.name = "questions"

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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vgwytrfp",
    "name": "text",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zd8kdbnv0ql1qf3")

  collection.name = "posts"

  // remove
  collection.schema.removeField("4foe8s9n")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vgwytrfp",
    "name": "post_name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
