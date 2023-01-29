migrate((db) => {
  const collection = new Collection({
    "id": "zd8kdbnv0ql1qf3",
    "created": "2023-01-27 20:52:46.796Z",
    "updated": "2023-01-27 20:52:46.796Z",
    "name": "posts",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("zd8kdbnv0ql1qf3");

  return dao.deleteCollection(collection);
})
