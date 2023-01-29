migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9s2uk5xou6z9fg8")

  collection.listRule = "@request.query.filter.question = question"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9s2uk5xou6z9fg8")

  collection.listRule = null

  return dao.saveCollection(collection)
})
