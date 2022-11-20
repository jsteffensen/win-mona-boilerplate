const fs = require('node:fs');
let os = require('os');


/*let btext = readFileSync('test2.ts');
let bjson = readJsonSync('build.json');

bjson['added-key'] = 12345;

btext += '';
writeFileSync('test2.ts', btext);
writeJsonSync('build.json', bjson);*/

writeLineToFileSync('test2.ts', '// here is inserted line at position 10', 10)

//*********************************************************************************

function readFileSync(file) {
	return fs.readFileSync(file,'utf8');
}

function readJsonSync(file) {
	let contentString = readFileSync(file);
	return JSON.parse(contentString);
}

function writeFileSync(file, txt) {
	fs.writeFileSync(file, txt);
}

function writeJsonSync(file, data) {
	writeFileSync(file, JSON.stringify(data, null, 4))
}

function writeLineToFileSync(file, txt, lineNumber) {
	
	let originalFile  = readFileSync(file);
	let lineArray = originalFile.split(os.EOL);
	
	lineArray.splice(lineNumber-1, 0, txt);
	
	let newFile = '';
	
	for (let i=0; i<lineArray.length; i++) {
	  newFile += lineArray[i] + os.EOL;
	}
	
	writeFileSync(file, newFile);
	
};