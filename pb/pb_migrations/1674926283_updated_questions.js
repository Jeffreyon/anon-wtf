migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zd8kdbnv0ql1qf3")

  collection.createRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zd8kdbnv0ql1qf3")

  collection.createRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
