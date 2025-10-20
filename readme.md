# 🧾 PDF Extractor para Holerites e Cartões de Ponto

Este projeto em **Node.js** extrai dados de **PDFs de holerites e cartões de ponto**, e gera automaticamente uma **planilha Excel (.xlsx)** com os resultados formatados.

---

## 💻 Tecnologias

- **Node.js** `^21`
- **exceljs** `^4.4.0`
- **pdf-parse** `^2.3.11`

---

## ⚙️ Pré-requisitos

- **Node.js** versão **18+**
- **npm** (instalado junto com o Node)
- **PDF com texto legível** — PDFs digitalizados sem OCR não funcionarão bem

---

## 🚀 Instalação

1. **Clone este repositório:**

   ```bash
   git clone https://github.com/Dantedevil10/quickFiller-PdfExtractor.git
   cd quickFiller-PdfExtractor
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Inicie o programa e siga as instruções:**

   ```bash
   node src/main.js
   ```

---

## 🧭 Uso

1. Escolha a opção desejada no terminal:

   ```
   Deseja Abrir um Pdf De Cartão ou Holerite ?
   1 - Cartão
   2 - Holerite
   ```

2. Escolha o arquivo desejado:

   ```
   Qual o nome do arquivo? (Não coloque o .pdf, somente o nome)
   ```

   Exemplos:

   - Para cartão: `testeCartao`
   - Para holerite: `Exemplo-Holerite-01`

3. O programa processará o arquivo e gerará uma planilha Excel automaticamente.

---

## 📂 Estrutura de Pastas

```
📦 quickFiller-PdfExtractor
├── input/        # PDFs de entrada
│   ├── testeCartao.pdf
│   └── Exemplo-Holerite-01.pdf
│
├── output/       # Planilhas geradas
│   ├── resultado_cartao_ponto.xlsx
│   └── resultado_holerite.xlsx
│
├── models/       # Modelos base de planilhas (.xlsx)
│
├── src/
│   ├── main.js
│   ├── utils/pdfUtils.js
│   ├── services/excelService.js
│   └── extractors/
│       ├── cartaoPontoExtractor.js
│       └── holeriteExtractor.js
```

---

## 📊 Saída Gerada

Após o processamento, o sistema criará automaticamente a planilha correspondente em `output/`.

| Tipo de PDF | Arquivo Gerado |
|--------------|----------------|
| Cartão de Ponto | `resultado_cartao_ponto.xlsx` |
| Holerite | `resultado_holerite.xlsx` |

---

## 🧠 Funcionamento Interno

- **`main.js`** → Gerencia a execução, entrada do usuário e chamadas aos módulos.  
- **`pdfUtils.js`** → Lê e converte o PDF em texto.  
- **`cartaoPontoExtractor.js`** → Extrai dados de ponto (mês, dia, entrada, saída, situação).  
- **`holeriteExtractor.js`** → Extrai dados de holerite (mês, proventos, descontos e líquido).  
- **`excelService.js`** → Preenche uma planilha modelo e salva no diretório `/output`.

---

## ⚠️ Observações

- O projeto **tolera variações de layout e espaçamento** nos PDFs.  
- O texto **precisa ser legível por OCR** (não apenas imagem).  
- Mensagens de aviso indicarão se nada foi extraído:
  ```
  ⚠️ Nenhum bloco de holerite identificado. Verifique o layout ou OCR.
  ⚠️ Nenhum 'Mês/Ano' encontrado. Verifique se o layout mudou.
  ```
- Pdfs de imagens não são lidos ou processados como texto

---

## 📡 Teste

Na pasta `/input` já existem arquivos de exemplo:

- `testeCartao.pdf`
- `Exemplo-Holerite-01.pdf`

Execute o programa e confira os resultados gerados em `/output`.

---

💡 **Dica:**  
Se quiser, adicione este script no `package.json` para iniciar mais rápido:

```json
"scripts": {
  "start": "node src/main.js"
}
```

Assim, basta rodar:
```bash
npm start
```

