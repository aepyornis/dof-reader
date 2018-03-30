const pdfToText = require('./pdfToText');


const dofReader = async (filePath) => {
  let text = await pdfToText(filePath);
  return {
    "text": text
  };
};


module.exports = dofReader;
