const ExcelJS = require("exceljs");

async function gerarPlanilha(modelPath, outputPath,  dados, tipo) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(modelPath);

  const sheet = workbook.worksheets[0]; // primeira aba

  // Define a linha inicial para começar a preencher ( 2 = logo abaixo do cabeçalho)
  let startRow = 2;

  if (tipo === "CartaoPonto" && dados) {
    dados.forEach((d, index) => {
      const row = sheet.getRow(startRow + index);
      row.values = [d.Data, d.entrada, d.intervalo ,d.saidaIntervalo, d.saida];
      row.commit();
    });
  } else if (tipo === "Holerite" && dados) {

  // Descobre todos os códigos únicos que aparecem no conjunto todo
  const codigosMap = new Map(); // codigo => descricao (a primeira descricao que aparecer)

  dados.forEach(holerite => {
    holerite.itens.forEach(item => {
      if (!codigosMap.has(item.codigo)) {
        codigosMap.set(item.codigo, item.descricao);
      }
    });
  });

  // Construir cabeçalho dinâmico (Ano, Mês + código QUANTIDADE + código VALOR)
  const headers = ["Ano", "Mês"];
  codigosMap.forEach((descricao, codigo) => {
    headers.push(`(${codigo}) ${descricao} QUANTIDADE`);
    headers.push(`(${codigo}) ${descricao} VALOR`);
  });

  // Limpa as linhas existentes (a partir da linha 2)
  sheet.spliceRows(2, sheet.rowCount);

  // Escrever o cabeçalho na planilha (linha 1)
  sheet.getRow(1).values = headers;
  sheet.getRow(1).commit();

  // Preencher linha por linha (um mês/ano por linha)
  let rowIndex = 2;

  dados.forEach(holerite => {
    const [mes, ano] = holerite.mesAno.split("/");

    // Cria objeto para a linha, inicializando todas as colunas de códigos com ""
    const linha = {};
    linha["Ano"] = ano;
    linha["Mês"] = mes;

    codigosMap.forEach((_, codigo) => {
      const descricao = codigosMap.get(codigo);
      linha[`(${codigo}) ${descricao} QUANTIDADE`] = "";
      linha[`(${codigo}) ${descricao} VALOR`] = "";
    });

    // Preenche valores reais do holerite
    holerite.itens.forEach(item => {
      const descricao = codigosMap.get(item.codigo);
      linha[`(${item.codigo}) ${descricao} QUANTIDADE`] = item.qtde || "";
      linha[`(${item.codigo}) ${descricao} VALOR`] = item.valor || "";
    });

    // Criar array com valores na ordem do cabeçalho
    const rowValues = headers.map(h => linha[h] || "");

    sheet.getRow(rowIndex).values = rowValues;
    sheet.getRow(rowIndex).commit();
    rowIndex++;
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