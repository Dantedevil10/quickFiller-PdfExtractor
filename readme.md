
# 🧾 PDF Extractor para Holerites e Cartões de Ponto
- Este projeto em Node.js extrai dados de PDFs de holerites e cartões de ponto, e gera automaticamente uma planilha Excel (.xlsx) com os resultados formatados.

### Tecnologias
- **Node.js "21^"**
- **exceljs "4.4.0"**
- **pdf-parse "2.3.11"**
- 
---
### ⚙️ Pré-requisitos
- Node.js versão 18+
- npm (instalado junto com o Node)
- PDF com texto legível (não apenas imagem — PDFs digitalizados sem OCR não funcionarão bem)

---

## 🚀 Instalação

. Certifique-se de que o package.json contenha ao menos:
```bash
{  "dependencies": {    "exceljs": "^4.4.0",    "pdf-parse": "^1.1.1"  }}
 ```

1. Clone Este repositório:
   ```bash
   git clone https://github.com/Dantedevil10/quickFiller-PdfExtractor.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```
.Coloque seus PDFs na pasta input/
 ```bash
Exemplo: input/holerite_maio.pdf
Exemplo: input/cartao_maio.pdf

  ```
3. Inicie o programa e siga as instruções:
   ```bash
   node src/main.js
   ```
4. Selecione qual Opção desejar no terminal:
   ```bash
   Deseja Abrir um Pdf De Cartão ou Holerite ? 1 - Cartão 2 - Holerite
   ```
5. Selecione o arquivo:
   ```bash
   Qual o nome do arquivo? (Não coloque o .pdf, somente o nome)
   ```

   > Todos os arquivos de planilha serão gerados em `/Output`\n
   > Todos os Aquivos para geração de planilha deverão ser Colocados na pasta `/Input`

---
##📊 Saída Gerada
Após o processamento, o sistema criará automaticamente a planilha Excel correspondente em output/:
---
##🧠 Funcionamento Interno
- main.js → gerencia a execução, entrada do usuário e chamadas aos módulos.
- pdfUtils.js → lê e converte o PDF em texto.
- cartaoPontoExtractor.js → interpreta o texto e extrai os dados de ponto (mês, dia, entrada, saída, situação).
- holeriteExtractor.js → extrai informações de holerite (mês, total de proventos, descontos e líquido).
- excelService.js → insere os dados extraídos em uma planilha modelo (/models) e salva em /output.

  ## Observações
O projeto tolera diferentes formatações de PDF, mas o texto deve estar acessível (OCR ativo).



## 📡 Teste

Na Pasta `/Input` existem 1 Arquivo `testeCartao.pdf` e `Exemplo-Holerite-01.pdf` que podem ser usados para gerar uma planilha final em `/Output`


---

