const fs = require('node:fs');

let btext = readFileSync('build.json');
let bjson = readJsonSync('build.json');

console.log(bjson['build-step-complete']);


//*********************************************************************************

function readFileSync(file) {
	return fs.readFileSync(file,'utf8');
}

function readJsonSync(file) {
	let contentString = fs.readFileSync(file,'utf8');
	return JSON.parse(contentString);
}





