const pdfUtils = require("./utils/pdfUtils.js");
const CartaoPontoData = require("./extractors/cartaoPontoExtractor.js");
const HoleriteData = require("./extractors/holeriteExtractor.js");
const Planilha = require("./services/excelService.js");

const readline = require("readline");
const fs = require("fs/promises");
const path = require("path");

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  //Interface No Terminal

  function ask(question) {
    return new Promise((resolve) => rl.question(question, resolve));
  }

  try {
    const resp = await ask(
      "Deseja Abrir um Pdf De Cartão ou Holerite ?\n 1 - Cartão\n 2 - Holerite\n"
    );

    // Mostrar arquivos disponíveis
    const arquivos = await fs.readdir(path.join(__dirname,".." ,"input"));
    const pdfs = arquivos.filter((nome) => nome.endsWith(".pdf"));

    if (pdfs.length === 0) {
      console.log("❌ Nenhum arquivo PDF encontrado na pasta /input.");
      rl.close();
      return;
    }

    console.log("📄 Arquivos disponíveis na pasta /input:");
    pdfs.forEach((nome) => console.log(" -", nome));

    const answer = await ask("Qual o nome do arquivo? (Não coloque o .pdf, somente o nome)\n");

    const caminhoArquivo = path.join(__dirname,".." , "input", `${answer}.pdf`);
    let exist = true;
    try {
      await fs.access(caminhoArquivo);
      console.log(`✅ O arquivo "${caminhoArquivo}" existe.`);
    } catch (err) {
      console.log(`❌ O arquivo "${caminhoArquivo}" não existe.`);
      exist = false;
    }

    if (!exist) {
      console.log("Encerrando o programa.");
      rl.close();
      return;
    }

    //Escolhas Do Usuário

    if (resp === "1") {
      // --- CARTÃO DE PONTO ---
      const textoCartaoPonto = await pdfUtils.extractPdfText(caminhoArquivo);
      if (textoCartaoPonto) {
        const dadosCartaoPonto = CartaoPontoData.extractCartaoPontoData(textoCartaoPonto);
        if (dadosCartaoPonto) {
          await Planilha.gerarPlanilha(
            "./models/Exemplo-Cartao-Ponto-01.xlsx",
            "./output/resultado_cartao_ponto.xlsx",
            dadosCartaoPonto,
            "CartaoPonto"
          );
        } else {
          console.log("⚠️ Nenhum dado extraído do cartão de ponto.");
        }
      } else {
        console.log("⚠️ Texto do PDF vazio.");
      }
      
    } else if (resp === "2") {
      // --- HOLERITE ---
      const textoHolerite = await pdfUtils.extractPdfText(caminhoArquivo);
      if (textoHolerite) {
        const dadosHolerite =
          HoleriteData.extractHoleriteData(textoHolerite);
        if (dadosHolerite) {
          await Planilha.gerarPlanilha(
            "./models/Exemplo-Holerite-01.xlsx",
            "./output/resultado_holerite.xlsx",
            dadosHolerite,
            "Holerite"
          );
        } else {
          console.log("⚠️ Nenhum dado extraído do holerite.");
        }
      } else {
        console.log("⚠️ Texto do PDF vazio.");
      }
    } else {
      console.log("❌ Opção inválida. Fechando o Programa.");
    }
  } catch (error) {
    console.error("Erro inesperado:", error);
  } finally {
    rl.close();
  }
}

main().catch(console.error);
