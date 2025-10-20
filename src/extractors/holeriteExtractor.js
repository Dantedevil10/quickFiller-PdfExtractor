/**
 * Extrai dados de holerites tolerando diferentes layouts e espaçamentos.
 * 
 * Aceita variações como:
 * - "Mes/Ano" sem acento
 * - Diferenças de espaçamento entre "T O T A L"
 * - OCR que une números (ex: 1234,56 em vez de 1.234,56)
 */
function extractHoleriteData(text) {
  const regexBloco =
    /(M[eê]s\/Ano)[:\s]+(\d{2}\/\d{4})[\s\S]*?T\s*O\s*T\s*A\s*L[\s\S]*?([\d.,]+)\s+([\d.,]+)[\s\S]*?L[ií]quido\s*a\s*Receber[\s\S]*?([\d.,]+)/gi;

  const resultados = [];
  let m;

  while ((m = regexBloco.exec(text))) {
    resultados.push({
      mesAno: m[2],
      totalProventos: m[3],
      totalDescontos: m[4],
      liquido: m[5],
    });
  }

  if (resultados.length === 0 || !resultados) {
    console.warn("⚠️ Nenhum bloco de holerite identificado. Verifique o layout ou OCR.");
    
  }else{
    return resultados;
  }

}

module.exports = { extractHoleriteData };
