#!/usr/bin/env node

const dofReader = require('../lib/dofReader');

dofReader(process.argv[2])
  .then( result => JSON.stringify(result, null, 4) )
  .then( x => console.log(x) )
  .catch(err => console.error(err) );




