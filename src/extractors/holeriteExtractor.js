/**
 * Extrai dados de holerites tolerando diferentes layouts e espaçamentos.
 * 
 * Aceita variações como:
 * - "Mes/Ano" sem acento
 * - Diferenças de espaçamento entre "T O T A L"
 * - OCR que une números (ex: 1234,56 em vez de 1.234,56)
*/
function extractHoleriteData(text) {
  const regexBloco = /(M[eê]s\/Ano)[:\s]+(\d{2}\/\d{4})[\s\S]*?0020\s+Horas\s+Normais\s+\t?([\d.,]+)\s+([\d.,]+)[\s\S]*?0060\s+Desc\.\s+Semanal\s+Remunerado\s+([\d.,]+)\s+([\d.,]+)[\s\S]*?1000\s+Aux[ií]lio\s+Doen[cç]a\s+\t?([\d.,]+)\s+([\d.,]+)[\s\S]*?1510\s+Integra[cç][aã]o\s+M[eé]dias\s+D\.S\.R\.\s+([\d.,]+)\s+([\d.,]+)[\s\S]*?T\s*O\s*T\s*A\s*L[\s\S]*?([\d.,]+)\s+([\d.,]+)[\s\S]*?L[ií]quido\s+a\s+Receber[\s\S]*?([\d.,]+)/gi;

  const resultados = [];
  let m;

  while ((m = regexBloco.exec(text))) {
    //console.log(m)
    resultados.push({
      mesAno: m[2],
      horasNormaisQtde: m[3],
      horasNormaisValor: m[4],
      semanalRemuneradoQtde: m[5],
      semanalRemuneradoValor: m[6],
      auxilioDoenca:m[7]
    });
  }

  if (resultados.length === 0 || !resultados) {
    console.warn("⚠️ Nenhum bloco de holerite identificado. Verifique o layout ou OCR.");
    
  }else{
    return resultados;
  }

}

module.exports = { extractHoleriteData };
