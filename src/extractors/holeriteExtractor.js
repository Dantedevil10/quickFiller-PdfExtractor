/**
 * Extrai dados de holerites tolerando diferentes layouts e espaçamentos.
 * 
 * Aceita variações como:
 * - "Mes/Ano" sem acento
 * - Diferenças de espaçamento entre "T O T A L"
 * - OCR que une números (ex: 1234,56 em vez de 1.234,56)
*/
function extractHoleriteData(text) {
  // Padroniza o marcador de Mês/Ano, se vier quebrado
  text = text.replace(/M[eê]s\/Ano\s*:\s*\n*\s*(\d{2}\/\d{4})/gi, 'Mês/Ano: $1');

  const blocos = [];
  const regexBloco = /((?:\d{4}[\s\S]+?)?)P R O V E N T O S D E S C O N T O S[\s\S]+?Mês\/Ano: (\d{2}\/\d{4})/gi;

  let match;
  while ((match = regexBloco.exec(text)) !== null) {
    const conteudo = match[1];
    const mesAno = match[2];

    const regexLinha = /^([A-Z\/\d]{3,})\s+(.+?)\s+((\d{1,4},\d{2})\s+)?(\d{1,4},\d{2})$/gm;

    const linhas = [];
    let linha;
    while ((linha = regexLinha.exec(conteudo))) {
      linhas.push({
        codigo: linha[1],
        descricao: linha[2].trim(),
        qtde: linha[4] ? linha[4].trim() : "",
        valor: linha[5].trim(),
      });
    }

    blocos.push({
      mesAno,
      itens: linhas,
    });
  }

  if (blocos.length === 0) {
    console.warn("⚠️ Nenhum bloco de holerite identificado.");
  }else{return blocos}

  //return blocos;
}



module.exports = { extractHoleriteData };
