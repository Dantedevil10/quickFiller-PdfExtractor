
# Sistema de Extração de dados de Pdf

### Tecnologias
- **Node.js "21^"**
- **exceljs "4.4.0"**
- **pdf-parse "2.3.11"** 


---

## ▶️ Como Rodar o Projeto

1. Clone Este repositório:
   ```bash
   git clone https://github.com/Dantedevil10/quickFiller-PdfExtractor.git
   ```

2. Instale as dependências:
   ```bash
   npm install
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

   > Todos os arquivos de planilha serão gerados em `/Output`
   > Todos os Aquivos para geração de planilha deverão ser Colocados na pasta `/Input`

---


## 📡 Teste

Na Pasta `/Input` existem 1 Arquivo `testeCartao.pdf` e `Exemplo-Holerite-01.pdf` que podem ser usados para gerar uma planilha final em `/Output`


- O backend emite eventos via WebSocket com o evento `localizacaoAtualizada`.
- Frontend escuta o evento e atualiza dinamicamente a posição no mapa.
- Outro evento importante: `Status Atualizado` (quando o status do entregador muda).

---

