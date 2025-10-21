const ExcelJS = require("exceljs");

async function gerarPlanilha(modelPath, outputPath,  dados, tipo) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(modelPath);

  const sheet = workbook.worksheets[0]; // primeira aba

  // Define a linha inicial para começar a preencher (por exemplo, 2 = logo abaixo do cabeçalho)
  let startRow = 2;

  if (tipo === "CartaoPonto" && dados) {
    dados.forEach((d, index) => {
      const row = sheet.getRow(startRow + index);
      row.values = [d.Data, d.entrada, d.saida, d.situacao];
      row.commit();
    });
  } else if (tipo === "Holerite" && dados) {
    dados.forEach((h, index) => {
      const row = sheet.getRow(startRow + index);
      row.values = [h.mesAno, h.totalProventos, h.totalDescontos, h.liquido];
      row.commit();
    });
  } else {
    console.log("Erro ao obter dados em: Gerar Planilhas");
    return;
  }

  await workbook.xlsx.writeFile(outputPath);
  console.log(`✅ Planilha de ${tipo === "CartaoPonto" ? "Cartão" : "Holerite"} 
    Criada em : ${outputPath}`);
}
module.exports = { gerarPlanilha };