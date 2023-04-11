[![CI](https://github.com/herbsjs/herbs2mongo/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/herbsjs/herbs2mongo/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/herbsjs/herbs2mongo/branch/main/graph/badge.svg)](https://codecov.io/gh/herbsjs/herbs2mongo)

# herbs2mongo

herbs2mongo creates repositories to retrieve and store [Entities](https://github.com/herbsjs/gotu) using [MongoDB](https://docs.mongodb.com/drivers/node/current/).

### Installing
```
    $ npm install @herbsjs/herbs2mongo
```

### Using

`connection.js` - MongoDB initialization:
```javascript
const {MongoClient,Logger} = require('mongodb')
const config = require('./config')
