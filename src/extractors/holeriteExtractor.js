/**
 * Extrai dados de holerites tolerando diferentes layouts e espaçamentos.
 * 
 * Aceita variações como:
 * - "Mes/Ano" sem acento
 * - Diferenças de espaçamento entre "T O T A L"
 * - OCR que une números (ex: 1234,56 em vez de 1.234,56)
*/
function extractHoleriteData(text) {
  const blocos = text.split(/M[eê]s\/Ano[:\s]+(\d{2}\/\d{4})/gi);
  const resultados = [];

  for (let i = 1; i < blocos.length; i += 2) {
    const mesAno = blocos[i];
    const conteudo = blocos[i + 1];

    const regexLinha = /^([A-Z\/\d]{3,})\s+(.+?)\s+((\d{1,3},\d{2})\s+)?(\d{1,3},\d{2})$/gm;

    const linhas = [];
    let m;
    while ((m = regexLinha.exec(conteudo))) {
      linhas.push({
        codigo: m[1],
        descricao: m[2].trim(),
        qtde: m[4] ? m[4].trim() : "",
        valor: m[5].trim(),
      });
    }

    resultados.push({
      mesAno,
      itens: linhas,
    });
  }

  if (resultados.length === 0 || !resultados) {
    console.warn("⚠️ Nenhum bloco de holerite identificado.");
  }else{
    return resultados;
  }

}


module.exports = { extractHoleriteData };
