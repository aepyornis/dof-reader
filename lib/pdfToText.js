const pdfjsLib = require('pdfjs-dist');
const range = require('lodash/range');

/**
 * Returns all text from PdfJS Document for the given page number
 * @param {PdfDoc} doc
 * @param {Integer} pageNum
 * @returns {Promise} 
 */
const getPageText = async (doc, pageNum) => {
  return await doc.getPage(pageNum)
    .then( page => page.getTextContent())
    .then(content => content.items.map(item => item.str).join(' ') );
};


/**
 * Retrives text from all pages in the PDF
 * @param {PdfJ doc} doc
 * @returns {Promise} 
 */
const allPagesText = (doc) => {
  return Promise.all(
    range(1, doc.numPages + 1)
      .map(i => getPageText(doc, i))
  ).then(texts => texts.join('\n'));
};


/**
 * Promise that resolves w/ the text of the pdf
 * @param {String} pdfPath Path to PDF File
 * @returns {Promise} 
 */
const pdfToText  = async (pdfPath) => {
  return await pdfjsLib.getDocument(pdfPath).then(allPagesText);
};

module.exports = pdfToText;
