/// <reference types="cypress" />

import { format, prepareLocalStorage } from '../support/utils'

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
        cy.visit('https://devfinance-agilizei.netlify.app/', {
            onBeforeLoad: (win) => {
                prepareLocalStorage(win)
            }
        });
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

        cy.get('#data-table tbody tr').should('have.length', 3);
    });

    it('Cadastrar saídas', () => {
        // entender o fluxo manualmente
        // mapear os elementos que vamos interagir
        // descrever as interações com o cypress
        // adicionar as asserç~;oes que a gente precisa

        cy.get('#transaction .button').click(); // #id -> Mapeamento por id. .classe -> Mapeamento por classe.
        cy.get('#description').type('Refrigerante'); 
        cy.get('[name=amount]').type(-12); // [atributo=valor] -> Mapeamento por atributo.
        cy.get('[type=date]').type('2021-07-27');
        cy.get('button').contains('Salvar').click(); // Mapeamento por tipo e valor

        cy.get('#data-table tbody tr').should('have.length', 3);
    });

    it('Remover entradas e saídas', () => {
        // entender o fluxo manualmente
        // mapear os elementos que vamos interagir
        // descrever as interações com o cypress
        // adicionar as asserç~;oes que a gente precisa
       
        // Estratégia 01
        // Voltar para o elemento-pai (tr), e avançar para um td com atributo img
        cy.get('td.description')
          .contains("Mesada")
          .parent()
          .find('img[onclick*=remove]') // * -> procura pelo onclick que contenha o texto "remove".
          .click();

        // Estratégia 02
        // Buscar todos os irmãos do elemento, e buscar o que tem img + attr
        cy.get('td.description')
          .contains("Suco Kapo")
          .siblings()
          .children('img[onclick*=remove]')
          .click();

        cy.get('#data-table tbody tr').should('have.length', 0);
    });

    it('Validar saldo com diversas transações', () => {
        // capturar as linhas com as transações e as colunas com valores
        // capturar o texto dessas colunas
        // formatar esses valores das linhas

        // somar os valores de entradas e saídas

        // capturar o texto do total
        // comparar o somatório de entradas e despesas com o total

        let incomes = 0;
        let expenses = 0;

        cy.get('#data-table tbody tr')
            .each(($el, index, $list) => { // elemento, índice, lista
                cy.get($el).find('td.income, td.expense').invoke('text').then(text => { // invoca funções do javascript
                    if(text.includes('-')){
                        expenses = expenses + format(text)
                    } else {
                        incomes = incomes + format(text)
                    }

                    cy.log(`entradas`, incomes)
                    cy.log(`saidas`, expenses)
                }) 
            }) 

        cy.get('#totalDisplay').invoke('text').then(text => {
            let formattedTotalDisplay = format(text)
            let expectedTotal = incomes + expenses

            expect(formattedTotalDisplay).to.eq(expectedTotal)
        })
    });
});