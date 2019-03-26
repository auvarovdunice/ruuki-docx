require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mammoth = require("mammoth");
const DomParser = require('dom-parser');
const parser = new DomParser();


const document = fs.readFileSync(path.join(__dirname, '../bin/documents/example.docx'));


mammoth.convertToHtml({buffer: document})
  .then(function(result){
    const html = result.value;
    const doc = parser.parseFromString(html, "text/html");
    console.log(doc)
  })
  .done();
