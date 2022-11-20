const fs = require('fs');

const json = {};

fs.readFile('build.json', (err, data) => {
    if (err) throw err;
    let build = JSON.parse(data);
    console.log(build['build-step-complete']);
});


/* fs.appendFile('build.json', JSON.stringify(json, null, 4), function (err) {
  if (err) throw err;
  console.log('Saved!');
});*/