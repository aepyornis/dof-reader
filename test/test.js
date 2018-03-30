const assert = require('assert');
const dofReader = require('../lib/dofReader.js');


/**
 * Test cases are configured in test-data.json
 * 
 */
const testData = require('./test-data.json');


describe('dofReader', () => {

  testData.forEach( testFile => {

    describe(testFile.file, () => {
      it('correctly parses', async () => {
	let result = await dofReader(testFile.file);
	assert.equal(result, testFile.result);
      });
    });

  });

});
