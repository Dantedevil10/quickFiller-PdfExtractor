/**
 * Extrai dados de cartões de ponto a partir do texto bruto de PDFs.
 * 
 * Tolerante a variações de layout como:
 * - "Mês/Ano" ou "Mes/Ano"
 * - Formatos de hora: 09:50 / 9h50 / 09.50 / 9h50 às 16h06
 * - Palavras com variações de OCR: Descanso / Desc. Sem. / Descanço
 */

function extractCartaoPontoData(text) {
  const resultados = [];
  const meses = [];

  // 🔍 Captura "Mês/Ano" ou "Mes/Ano", com ou sem acento
  const regexMes = /(M[eê]s\/Ano)[:\s]+(\d{2}\/\d{4})/gi;
  let matchMes;
  while ((matchMes = regexMes.exec(text))) {
    meses.push({ mesAno: matchMes[2], startIndex: matchMes.index });
  }

  if (meses.length === 0) {
    console.warn("⚠️ Nenhum 'Mês/Ano' encontrado. Verifique se o layout mudou.");
  }

  // 🔄 Processa cada bloco de mês isoladamente
  for (let i = 0; i < meses.length; i++) {
    const atual = meses[i];
    const proximo = meses[i + 1];
    const trecho = text.slice(atual.startIndex, proximo ? proximo.startIndex : undefined);

    // 🧠 Regex tolerante:
    // - aceita 09:50 / 9h50 / 09.50 / 9:50 às 16:06
    // - aceita "Descanso", "Desc. Sem.", "N Feriado", "NFeriado"
    const regexDia = /(\d{1,2})\s+\w{3}\s+(\d{1,2}[:h.]\d{2})\s*(?:[-aàs]\s*)(\d{1,2}[:h.]\d{2})[\s\S]*?(Desc\S*|N\s?Feriado|Sim|Não|S|N)/gi;

    let m;
    while ((m = regexDia.exec(trecho))) {
      resultados.push({
        mesAno: atual.mesAno,
        dia: m[1],
        entrada: m[2],
        saida: m[3],
        situacao: m[4].trim(),
      });
    }

    if (resultados.length === 0) {
      console.warn(`⚠️ Nenhum registro encontrado para o mês ${atual.mesAno}.`);
    }
  }

  return resultados;
}

module.exports = { extractCartaoPontoData };
