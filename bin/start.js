require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const htmlGenerator = require('./html-templates/html-template');

const document = fs.readFileSync(path.join(__dirname, '../bin/documents/example.docx'));

mammoth.convertToHtml({buffer: document})
  .then(function(result){
    const html = `<body>${result.value}</body>`;
    const { document } = (new JSDOM(html)).window;
    const bodyElements = document.body.children;
    const sections = [];
    const setctionKeywords = new Set([
      'Takuuehdot, Listat',
      'Takuuehdot, sadevesijärjestelmä',
      'Takuuehdot, kattoturvatuotteet',
      'Takuuehdot, Läpiviennit',
      'Takuuehdot, Aluskate',
      'Takuuta koskevat vaatimukset'
    ]);

    let currentSection = [];
    currentSection.name = 'TITLE'

    Object.keys(bodyElements).forEach((item) => {
      const elementText = bodyElements[item].firstChild.innerHTML;
      if (elementText && setctionKeywords.has(elementText)) {
        sections.push([...currentSection]);
        currentSection = [];
        currentSection.name = elementText;
        currentSection.push(bodyElements[item].outerHTML);
      } else {
        currentSection.push(bodyElements[item].outerHTML);
      }
    })

    sections.push([...currentSection]);
    const contentArray = sections.map(item => {
      return `<div class="wrapper page-break">${item.join('')}</div>`;
    })

    const htmlString = htmlGenerator(contentArray);
    fs.writeFileSync('generated.html', htmlString);

  })
  .done();
