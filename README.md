# Angular / Pouchdb / Leveldb

An experiment to integrate Pouchdb with Angular. 

This involves running `express-pouchdb` which internally creates LevelDB and exposes a CouchDB-compliant HTTP api so that `pouchdb-browser` can sync via HTTP adapter.

This opens many opportunities for handling event streaming in Node.js (via express app) and push directly to LevelDB as data source, while pouchdb browser can act as a passive subscribers. This use case is perfectly fit for cross browsers / cross tabs syncing or even Electron based hybrid application.

### To run express-pouchdb
```
cd ./leveldb
node index.js # this opens express app at localhost:3000
```

Note: we need to enable cors.

Apart from that, we can specify the location to store LevelDB files and also create multiple PouchDB instances in the same express app. In this case, I create 2 databases at `/db/todos` and `/db/configs`.


### To run angular
```
ng serve
```

At `localhost:4200`, we can see 2 inputs for 2 different PouchDB instances mapped to the 2 express paths like below.
```
    this.todoDb = new PouchDB('http://localhost:3000/db/todos/', {
      ajax: {
        withCredentials: false
      }
    });
    this.configDb = new PouchDB('http://localhost:3000/db/configs', {
      ajax: {
        withCredentials: false
      }
    });
    console.log(this.todoDb.adapter); # will be 'http' (no longer 'idb' or indexed db)
```




