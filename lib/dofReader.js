const pdfToText = require('./pdfToText');
const toInteger = require('lodash/toInteger');
  

// Regular expressions used in parsing

const rentStabFeeRegex = new RegExp('Rent[ ]+Stabilization[ ]+Fee', 'i');
const unitCountRegex = new RegExp('Housing-Rent[ ]+Stabilization[ ]+(\\d+)', 'i');
const dateRegex = new RegExp('Statement Activity through[ ]+(\\w+[ ]+\\d{1,2},?[ ]+\\d{4})', 'i');


/**
 * Determines if String contains the text "Rent Stabilizaiton Fee"
 * @param {String} str
 * @returns {Boolean}
 */
const hasRentStabilizationFee = str => rentStabFeeRegex.test(str);


/**
 * Extract unit count from tax bbill
 * @param {String} str
 * @returns {Int|Null} 
 */
const unitCount = str => {
  let match = unitCountRegex.exec(str);
  return match ? toInteger(match[1]) : null;
};

 
/**
 * Extracts the statment date
 * @param {String} str
 * @returns {String} date string in format YYYY-MM-DD
 */
const statementDate = str => {
  let match = dateRegex.exec(str);
  let dateStr = match[1];
  return new Date(dateStr).toISOString().slice(0, 10);
};

/**
 * Parses pdf tax bill and returns object
 * if there is a rentStabilization fee indicator
 * and the associated count of units
 *
 * @param {str} filePath path to pdf file
 * @returns {Object} 
 */
const dofReader = async function(filePath) {
  let text = await pdfToText(filePath);
  return {
    'rentStabilized': hasRentStabilizationFee(text),
    'unitCount': unitCount(text),
    'date': statementDate(text)
  };
};


module.exports = dofReader;
