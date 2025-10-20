const ExcelJS = require("exceljs");

async function gerarPlanilha(modelPath, outputPath,  dados, tipo) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(modelPath);

  const sheet = workbook.worksheets[0]; // primeira aba

  if (tipo === "CartaoPonto" && dados ) {
    dados.forEach((d) => {
      sheet.addRow([d.mesAno, d.dia, d.entrada, d.saida, d.situacao]);
    });
    //console.log(dados)
  }else{console.log("Erro ao obter dados em : Gerar Planilhas")}

  if (tipo === "Holerite"  && dados) {
    dados.forEach((h) => {
      sheet.addRow([h.mesAno, h.totalProventos, h.totalDescontos, h.liquido]);
    });
    //console.log(dados)
  }else{console.log("Erro ao obter dados em : Gerar Planilhas")}

  await workbook.xlsx.writeFile(outputPath);
  console.log(`✅ Planilha de ${tipo === "CartaoPonto" ? "Cartão" : "Holerite"} 
    Criada em : ${outputPath}`);
}
module.exports = { gerarPlanilha };