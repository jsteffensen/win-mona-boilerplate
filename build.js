const fs = require('fs');

const json = {};

json.somekey = 'somevalue';
json.somekey2 = 123;
json.arr = [];
json.arr.push( {'firstinarr': 'foo'} );


fs.appendFile('build.json', JSON.stringify(json, null, 4), function (err) {
  if (err) throw err;
  console.log('Saved!');
});