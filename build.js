const fs = require('node:fs');
const https = require('https');
let os = require('os');
let path = require('path');


/*

USAGE 

writeFileSync('test2.ts', 'some file text');
writeJsonSync('build.json', {"foo": "bar"});
writeLineToFileSync('test2.ts', '// here is inserted line at line number 10', 10);
writeLineToFileAfterLineStartingWith('test2.ts', '// inserted line at text', 'function writeJsonSync');
downloadFileToRelativePath('https://raw.githubusercontent.com/jsteffensen/win-mona-boilerplate/master/test2.ts', '\\somedir\\', 'downloaded.ts');

*/


//*********************************************************************************
//                                LOAD
//*********************************************************************************

let buildObj = readJsonSync('build.json');
let projectRoot = buildObj['project-root'];
let angular_json = readJsonSync(projectRoot + '\\angular.json')


//*********************************************************************************
//                                SETTERS
//*********************************************************************************

setBuildOutputPath();
addOsEOLToFiles();
addFormsModule();


//*********************************************************************************
//                                ANGULAR SPECIFIC
//*********************************************************************************

function setBuildOutputPath() {
	
	let project = buildObj['project'];
	
	angular_json['projects'][project]['architect']['build']['options']['outputPath'] = 'public';
	writeJsonSync(projectRoot + '\\angular.json', angular_json);
	
	console.log('setBuildOutputPath');
}

function addOsEOLToFiles() {
	
		makeOsEOL(projectRoot + '\\src\\app\\app.module.ts');
		
		console.log('addOsEOLToFiles');
}

function addFormsModule() {

	writeLineToFileAfterLineStartingWith(projectRoot + '\\src\\app\\app.module.ts', 'import { FormsModule } from \'@angular/forms\';', 'import { AppRoutingModule }');
	writeLineToFileAfterLineStartingWith(projectRoot + '\\src\\app\\app.module.ts', '    FormsModule,', '    BrowserModule,');
	
	console.log('addFormsModule');
}


//*********************************************************************************
//                                UTILS
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
	
	let newFileText = '';
	
	for (let i=0; i<lineArray.length; i++) {
	  newFileText += lineArray[i] + os.EOL;
	}
	
	writeFileSync(file, newFileText);

};

function makeOsEOL(file) {
	
	let originalFile  = readFileSync(file);
	originalFile = originalFile.trim();
	originalFileArr = originalFile.split(/\r?\n/);
	
	let newFile  = '';
	
	for (let i=0; i<originalFileArr.length; i++) {
		newFile += originalFileArr[i] + os.EOL;
	}
	
	writeFileSync(file, newFile);
}

function writeLineToFileAfterLineStartingWith(file, txt, lineStartsWith) {
	
	let originalFile  = readFileSync(file);
	let lineArray = originalFile.split(os.EOL);
	let hasFoundLine = false;
	
	for (let i=0; i<lineArray.length; i++) {
	  if(lineArray[i].startsWith(lineStartsWith)) {
		  hasFoundLine = true;
		  lineArray.splice(i+1, 0, txt);
		  break;
	  }
	}
	
	if(!hasFoundLine) {
		console.log('Error: Never found line to insert after! Searched ' + lineArray.length + ' lines.');
		return;
	}
	
	let newFileText = '';
	
	for (let k=0; k<lineArray.length; k++) {
	  newFileText += lineArray[k] + os.EOL;
	}
	
	writeFileSync(file, newFileText);
};

function ensureDirectoryExistence(filePath) {
	
  let dirname = path.dirname(filePath);
  
  if (fs.existsSync(dirname)) {
    return true;
  }
  
  ensureDirectoryExistence(dirname);
  
  fs.mkdirSync(dirname);
}

function downloadFileToRelativePath(downloadFile, relativeSavePath, saveAsFileName) {
	
	let currentDirectory = __dirname;
	let saveFile = currentDirectory + relativeSavePath + saveAsFileName;
	
	ensureDirectoryExistence(saveFile);
	
	const file = fs.createWriteStream(saveFile);
	
	const request = https.get(downloadFile, function(response) {
	   response.pipe(file);

	   file.on('finish', () => {
		   file.close();
		   console.log('Download Completed');
	   });
	});
}