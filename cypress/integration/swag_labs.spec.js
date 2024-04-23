///<reference types="Cypress" />

describe('My First Test', () => {
    beforeEach(function(){
        cy.visit('https://www.saucedemo.com')
    })

    it('Página deve conter o Título', () => {
      cy.get('.login_logo').contains('Swag Labs')
    })

    it('Logar com um usuário standard_user', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="title"]').should('be.visible')
    })

    it('Logar com um usuário locked_out_user', () => {
        cy.get('[data-test="username"]').type('locked_out_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('be.visible').contains('Epic sadface: Sorry, this user has been locked out.')
    })

    it('Logar com um usuário problem_user', () => {
        cy.get('[data-test="username"]').type('problem_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="title"]').should('be.visible')
    })

    it('Adicionar um produto ao carrinho', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="title"]').should('be.visible')
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_badge').should('be.visible')
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

    it('Comprar mais de um produto do carrinho', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="title"]').should('be.visible')
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
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

    it('Selecionar a ordem dos produtos por Nome de A - Z', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="title"]').should('be.visible')
        cy.get('.product_sort_container').select('az')
        cy.get('.active_option').contains('Name (A to Z)')
    })

    it('Selecionar a ordem dos produtos por Nome de Z - A', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="title"]').should('be.visible')
        cy.get('.product_sort_container').select('za')
        cy.get('.active_option').contains('Name (Z to A)')
    })

    it('Selecionar a ordem dos produtos por Preço de baixo a alto', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="title"]').should('be.visible')
        cy.get('.product_sort_container').select('lohi')
        cy.get('.active_option').contains('Price (low to high)')
    })

    it('Selecionar a ordem dos produtos por Preço de alto a baixo', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="title"]').should('be.visible')
        cy.get('.product_sort_container').select('hilo')
        cy.get('.active_option').contains('Price (high to low)')
    })

    it('Carrinho com o produto removido deverá ter o total de itens como $0', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="title"]').should('be.visible')
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('button[class="btn btn_secondary btn_small cart_button"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('QA')
        cy.get('[data-test="lastName"]').type('Teste')
        cy.get('[data-test="postalCode"]').type(97229000)
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="total-label"]').contains('0.00').should('be.visible')
    })

})