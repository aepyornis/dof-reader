const assert = require('assert');
const path = require('path');

const dofReader = require('../lib/dofReader.js');

const pdfFilePath = (filePath) => path.resolve(path.join(__dirname, 'pdfs', filePath));

/**
 * Test cases are configured in test-data.json
 * 
 */
const testData = require('./test-data.json');


describe('dofReader', () => {

  testData.forEach( testFile => {

    const testFilePath = pdfFilePath(testFile.file);
    
    describe(testFile.file, () => {
      it('correctly parses', async () => {
	let result = await dofReader(testFilePath);
	assert.deepEqual(result, testFile.result);
      });
    });

  });

});
