🧾 PDF Extractor para Holerites e Cartões de Ponto
--------------------------------------------------

Este projeto em **Node.js** extrai dados de **PDFs de holerites e cartões de ponto**, e gera automaticamente uma **planilha Excel (.xlsx)** com os resultados formatados.

### 📁 Estrutura do Projeto

 📦 pdf-extractor  ├── input/                     # Pasta onde ficam os PDFs a serem processados  │   ├── exemplo_holerite.pdf  │   └── exemplo_cartao_ponto.pdf  │  ├── output/                    # Planilhas geradas são salvas aqui  │   └── resultado_holerite.xlsx  │  ├── models/                    # Modelos base de planilhas  │   ├── Exemplo-Cartao-Ponto-01.xlsx  │   └── Exemplo-Holerite-01.xlsx  │  ├── extractors/                # Extratores específicos de dados  │   ├── holeriteExtractor.js  │   └── cartaoPontoExtractor.js  │  ├── services/                  # Serviços auxiliares (geração de planilhas, etc.)  │   └── excelService.js  │  ├── utils/                     # Funções utilitárias  │   └── pdfUtils.js  │  ├── main.js                    # Arquivo principal (ponto de entrada)  └── package.json   `

### ⚙️ Pré-requisitos

*   **Node.js** versão **18+**
    
*   **npm** (instalado junto com o Node)
    
*   PDF com texto legível (não apenas imagem — PDFs digitalizados sem OCR não funcionarão bem)
    

### 🚀 Instalação

1.  git clone https://github.com/seuusuario/pdf-extractor.gitcd pdf-extractor
    
2.  npm installCertifique-se de que o package.json contenha ao menos:{ "dependencies": { "exceljs": "^4.4.0", "pdf-parse": "^1.1.1" }}
    
3.  mkdir input output models
    
4.  **Coloque seus PDFs na pasta input/**
    
    *   Exemplo: input/holerite\_maio.pdf
        
    *   Exemplo: input/cartao\_maio.pdf
        

### ▶️ Como Executar

No terminal, dentro da pasta do projeto:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   node main.js   `

O programa exibirá um menu interativo:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Deseja Abrir um Pdf De Cartão ou Holerite ?   1 - Cartão   2 - Holerite   `

Depois, mostrará os arquivos encontrados na pasta input/, e pedirá o nome do arquivo (sem o .pdf).

Exemplo:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   📄 Arquivos disponíveis na pasta /input:   - holerite_maio.pdf   - cartao_maio.pdf  Qual o nome do arquivo? (Não coloque o .pdf, somente o nome)  > holerite_maio   `

### 📊 Saída Gerada

Após o processamento, o sistema criará automaticamente a planilha Excel correspondente em output/:

Tipo de PDFArquivo geradoCartão de Pontooutput/resultado\_cartao\_ponto.xlsxHoleriteoutput/resultado\_holerite.xlsx

### 🧠 Funcionamento Interno

*   **main.js** → gerencia a execução, entrada do usuário e chamadas aos módulos.
    
*   **pdfUtils.js** → lê e converte o PDF em texto.
    
*   **cartaoPontoExtractor.js** → interpreta o texto e extrai os dados de ponto (mês, dia, entrada, saída, situação).
    
*   **holeriteExtractor.js** → extrai informações de holerite (mês, total de proventos, descontos e líquido).
    
*   **excelService.js** → insere os dados extraídos em uma planilha modelo (/models) e salva em /output.
    

### 🧩 Exemplo de Saída — Cartão de Ponto

Mês/AnoDiaEntradaSaídaSituação05/20240109:0018:00Normal05/20240209:1518:05Descanso

### ⚠️ Observações

*   O projeto **tolera diferentes formatações de PDF**, mas o texto deve estar acessível (OCR ativo).
    
*   ⚠️ Nenhum bloco de holerite identificado. Verifique o layout ou OCR.⚠️ Nenhum 'Mês/Ano' encontrado. Verifique se o layout mudou.
    

### 🧰 Scripts úteis

Para rodar mais rápido:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   npm start   `

Adicione no package.json:

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   "scripts": {    "start": "node main.js"  }   `
