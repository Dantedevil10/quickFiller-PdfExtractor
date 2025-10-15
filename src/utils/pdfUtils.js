const fs = require("fs");
const { PDFParse } = require("pdf-parse");

async function extractPdfText(path) {
  const buffer = fs.readFileSync(path);
  const parser = new PDFParse({ data: buffer });
  const { text } = await parser.getText();
  await parser.destroy();  
  return text;
}

module.exports = {extractPdfText}
