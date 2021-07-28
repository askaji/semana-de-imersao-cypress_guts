/// <reference types="cypress" />

/**
 * Cadastrar entradas
 * Cadastrar saídas
 * Remover entradas e saídas
 */

// 
// cy.viewport
// arquivos de config
// passar as configs por linhas de comando
//    npx cypress open --config viewportWidth=441,viewportHeight=823

// Rodar os testes headless (gera um video)
//    npx cypress run --config viewportWidth=441,viewportHeight=823

context('Dev Finances Agilizei', () => {

    // hooks
    // trechos que executam antes e depois do teste
    // before -> antes de todos os testes
    // beforeEach -> antes de cada teste
    // after -> depois de todos os testes
    // afterEach -> depois de cada teste

    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app/');
        cy.get('#data-table tbody tr').should('have.length', 0);
    });
    
    it('Cadastrar entradas', () => {
        // entender o fluxo manualmente
        // mapear os elementos que vamos interagir
        // descrever as interações com o cypress
        // adicionar as asserç~;oes que a gente precisa

        cy.get('#transaction .button').click(); // #id -> Mapeamento por id. .classe -> Mapeamento por classe.
        cy.get('#description').type('Mesada'); 
        cy.get('[name=amount]').type(12); // [atributo=valor] -> Mapeamento por atributo.
        cy.get('[type=date]').type('2021-07-27');
        cy.get('button').contains('Salvar').click(); // Mapeamento por tipo e valor

        cy.get('#data-table tbody tr').should('have.length', 1);
    });

    it('Cadastrar saídas', () => {
        // entender o fluxo manualmente
        // mapear os elementos que vamos interagir
        // descrever as interações com o cypress
        // adicionar as asserç~;oes que a gente precisa

        cy.get('#transaction .button').click(); // #id -> Mapeamento por id. .classe -> Mapeamento por classe.
        cy.get('#description').type('Mesada'); 
        cy.get('[name=amount]').type(-12); // [atributo=valor] -> Mapeamento por atributo.
        cy.get('[type=date]').type('2021-07-27');
        cy.get('button').contains('Salvar').click(); // Mapeamento por tipo e valor

        cy.get('#data-table tbody tr').should('have.length', 1);
    });

    it('Remover entradas e saídas', () => {
        // entender o fluxo manualmente
        // mapear os elementos que vamos interagir
        // descrever as interações com o cypress
        // adicionar as asserç~;oes que a gente precisa

        const entrada = 'Total';
        const saida = 'KinderOvo';

        cy.get('#transaction .button').click(); // #id -> Mapeamento por id. .classe -> Mapeamento por classe.
        cy.get('#description').type(entrada); 
        cy.get('[name=amount]').type(100); // [atributo=valor] -> Mapeamento por atributo.
        cy.get('[type=date]').type('2021-07-27');
        cy.get('button').contains('Salvar').click(); // Mapeamento por tipo e valor
        
        cy.get('#transaction .button').click(); // #id -> Mapeamento por id. .classe -> Mapeamento por classe.
        cy.get('#description').type(saida); 
        cy.get('[name=amount]').type(-80); // [atributo=valor] -> Mapeamento por atributo.
        cy.get('[type=date]').type('2021-07-27');
        cy.get('button').contains('Salvar').click(); // Mapeamento por tipo e valor
       
        // Estratégia 01
        // Voltar para o elemento-pai (tr), e avançar para um td com atributo img
        cy.get('td.description')
          .contains(entrada)
          .parent()
          .find('img[onclick*=remove]') // * -> procura pelo onclick que contenha o texto "remove".
          .click();

        // Estratégia 02
        // Buscar todos os irmãos do elemento, e buscar o que tem img + attr
        cy.get('td.description')
          .contains(saida)
          .siblings()
          .children('img[onclick*=remove]')
          .click();

        cy.get('#data-table tbody tr').should('have.length', 0);
    });
});