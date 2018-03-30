const pdfToText = require('./pdfToText');
const toInteger = require('lodash/toInteger');
  

// Regular expressions used in parsing

const rentStabFeeRegex = new RegExp('Rent[ ]+Stabilization[ ]+Fee', 'i');
const unitCountRegex = new RegExp('Housing-Rent[ ]+Stabilization[ ]+(\\d+)', 'i');



/**
 * Determines if String contains the text "Rent Stabilizaiton Fee"
 * @param {String} str
 * @returns {Boolean}
 */
const hasRentStabilizationFee = (str) => rentStabFeeRegex.test(str);


/**
 * Extract unit count from tax bbill
 * @param {String} str
 * @returns {Int|Null} 
 */
const unitCount = (str) => {
  let match = unitCountRegex.exec(str);
  if (match) {
    return toInteger(match[1]);
  } else {
    return null;
  }
  
};


/**
 * Parses pdf tax bill and returns object
 * if there is a rentStabilization fee indicator
 * and the associated count of units
 *
 * @param {str} filePath path to pdf file
 * @returns {Object} 
 */
const dofReader = async (filePath) => {
  let text = await pdfToText(filePath);
  return {
    "rentStabilized": hasRentStabilizationFee(text),
    "unitCount": unitCount(text)
  };
};


module.exports = dofReader;
