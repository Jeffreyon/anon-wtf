migrate((db) => {
  const collection = new Collection({
    "id": "9s2uk5xou6z9fg8",
    "created": "2023-01-28 17:19:49.995Z",
    "updated": "2023-01-28 17:19:49.995Z",
    "name": "replies",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "b6tapyxr",
        "name": "text",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "rqos76cw",
        "name": "question",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "zd8kdbnv0ql1qf3",
          "cascadeDelete": false
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
  const collection = dao.findCollectionByNameOrId("9s2uk5xou6z9fg8");

  return dao.deleteCollection(collection);
})
