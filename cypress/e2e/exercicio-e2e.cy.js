/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json')
import produtosPage from "../support/commands"

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  beforeEach(() => {
    // Realiza login antes de cada teste
    cy.visit('/my-account');
    cy.get('#username').type(perfil.usuario)
    cy.get('#password').type(perfil.senha)
    cy.get('.woocommerce-form > .button').click()

    // Valida que o login foi bem-sucedido
    cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, Leo.Martins')
  });

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
    cy.visit('/produtos/')
    produtosPage.buscarProdutoLista('Aether Gym Pant')
    produtosPage.addProdutoCarrinho('32', 'Blue', 1)
    cy.get('.woocommerce-message').should('exist')
    //Adicionado produto 01
    cy.visit('/produtos/')
    produtosPage.buscarProdutoLista('Aero Daily Fitness Tee')
    produtosPage.addProdutoCarrinho('S', 'Black', 1)
    cy.get('.woocommerce-message').should('exist')
    //Adicionado produto 02
    cy.visit('/produtos/')
    produtosPage.buscarProdutoLista('Arcadio Gym Short')
    produtosPage.addProdutoCarrinho('33', 'Red', 2)
    cy.get('.woocommerce-message').should('exist')
    //Adicionado produto 03
    cy.visit('/produtos/')
    produtosPage.buscarProdutoLista('Ariel Roll Sleeve Sweatshirt')
    produtosPage.addProdutoCarrinho('L', 'Purple', 3)
    cy.get('.woocommerce-message').should('exist')
    //Adicionado produto 04
    cy.visit('carrinho/')
    cy.get('.checkout-button').click()
    //Visitando o Carrinho
    cy.get('#billing_postcode').clear().type('25750-222')
    cy.get('#billing_address_1').clear().type('Estrada união Industria')
    cy.get('#billing_address_2').clear().type('20.301')
    cy.get('#billing_city').clear().type("Petrópolis")
    cy.get('#billing_phone').clear().type('24 993117595')
    cy.get('#terms').click()
    cy.get('#place_order').click()
    //Preenchendo Dados e clicando em finalizar compra
    cy.wait(3000)
    cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
  });

});