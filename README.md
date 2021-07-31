# GUTS - Semana de Imersão Cypress 26/07/2021

Semana Agilizei 3.0 - Imersão GUTS-RS ([Link](https://agilizei.com/imersao-guts/))

Automação com Cypress - Facilitador: Samuel Lucas

# Requisitos

* [VSCode](https://code.visualstudio.com/)
* [Node.js](https://nodejs.org/en/download/)
* [Cypress](https://www.cypress.io/)

# Executando os testes

Link da aplicação testada: https://devfinance-agilizei.netlify.app

1. Baixar as dependências do package.json
```
npm install
```

2. Executar os testes
```
npx cypress open
```
(Opcional) Execução dos testes em modo headless
```
npx cypress run
```

# O que tem neste projeto?

* Automação de alguns cenários de teste da aplicação de teste;
* Uso de arquivo de utilidades do diretório de support;
* Criação de scripts no arquivo package.json;
* Configurações do Cypress Dashboard no arquivo cypress.json;
* Uso de Secrets no repositório para armazenar informações sensíveis;
* Github Workflow configurado e executando.

Anotações feitas durante as aulas:
https://www.evernote.com/shard/s615/sh/e466143a-27d7-5c3d-e586-8164f0c00517/
