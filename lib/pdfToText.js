const pdfjsLib = require('pdfjs-dist');
const range = require('lodash/range');

/**
 * `content.items` is an array of textContent objects.
 * This simply extracts the text from each one and join them with a spaces.
  * Example textContent object:
    {
      str: 'Statement Details',
      dir: 'ltr',
      width: 92.30108390999999,
      height: 11.00001,
      transform: [Array],
      fontName: 'Helvetica'
    },
 * @param {Array}
 * @returns {String} 
 */
const joinTextContent = content => content.items.map(item => item.str).join(' ');


/**
 * Returns all text from PdfJS Document for the given page number
 * @param {PdfDoc} doc
 * @param {Integer} pageNum
 * @returns {Promise} 
 */
const getPageText =  (doc, pageNum) => doc.getPage(pageNum)
                                          .then( page => page.getTextContent())
                                          .then(joinTextContent);

/**
 * Retrives text from all pages in the PDF
 * @param {PdfJ doc} doc
 * @returns {Promise} 
 */
const allPagesText = doc => Promise.all(
  range(1, doc.numPages + 1).map(i => getPageText(doc, i))
).then(texts => texts.join('\n'));


/**
 * Promise that resolves w/ the text of the pdf
 * @param {String} pdfPath Path to PDF File
 * @returns {Promise} 
 */
const pdfToText  = pdfPath => pdfjsLib.getDocument(pdfPath)
                                      .promise.then(allPagesText);


module.exports = pdfToText;
