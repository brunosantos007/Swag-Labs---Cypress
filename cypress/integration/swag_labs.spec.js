///<reference types="Cypress" />

describe('My First Test', () => {
    beforeEach(function(){
        cy.visit('https://www.saucedemo.com')
    })

    it('Página deve conter o Título', () => {
      cy.get('.login_logo').contains('Swag Labs')
    })

    it('logar com um usuário standard_user', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="title"]').should('be.visible')
    })

    it('logar com um usuário locked_out_user', () => {
        cy.get('[data-test="username"]').type('locked_out_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('be.visible').contains('Epic sadface: Sorry, this user has been locked out.')
    })

    it('logar com um usuário problem_user', () => {
        cy.get('[data-test="username"]').type('problem_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="title"]').should('be.visible')
    })

    it('logar com um usuário performance_glitch_user', () => {
        cy.get('[data-test="username"]').type('performance_glitch_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="inventory-item-name"]').should('be.visible')
    })

    it('Adicionar um produto ao carrinho', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="title"]').should('be.visible')
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_badge').should('be.visible')
    })

    it('Remover um produto do carrinho', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="title"]').should('be.visible')
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="remove-sauce-labs-backpack"]').click()
    })

    it('Comprar um produto do carrinho', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="title"]').should('be.visible')
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('QA')
        cy.get('[data-test="lastName"]').type('Teste')
        cy.get('[data-test="postalCode"]').type(97229000)
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="finish"]').click()
        cy.get('[data-test="pony-express"]').should('be.visible')
        cy.get('[data-test="complete-header"]').contains('Thank you for your order!')
    })
})