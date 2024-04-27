///<reference types="Cypress" />

describe('My First Test', () => {
    beforeEach(function(){
        cy.page()
    })

    it('Página deve conter o Título', () => {
      cy.get('.login_logo').contains('Swag Labs')
    })

    it('Logar com um usuário standard_user', () => {
        cy.login_standardUser();
    })

    it('Logar com um usuário locked_out_user', () => {
        cy.login_lockedOutUser()
        cy.get('[data-test="error"]').should('be.visible').contains('Epic sadface: Sorry, this user has been locked out.')
    })

    it('Logar com um usuário problem_user', () => {
        cy.login_problemUser()
        cy.get('[data-test="title"]').should('be.visible')
    })

    it('Adicionar um produto ao carrinho', () => {
        cy.login_standardUser()
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_badge').should('be.visible')
    })

    it('Remover um produto do carrinho', () => {
        cy.login_standardUser()
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="remove-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible')
    })

    it('Comprar um produto do carrinho', () => {
        cy.login_standardUser()
        cy.buy_a_product()
    })

    it('Comprar mais de um produto do carrinho', () => {
        cy.login_standardUser()
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('QA')
        cy.get('[data-test="lastName"]').type('Teste')
        cy.get('[data-test="postalCode"]').type('97229000')
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="finish"]').click()
        cy.get('[data-test="pony-express"]').should('be.visible')
        cy.get('[data-test="complete-header"]').contains('Thank you for your order!')
    })

    it('Selecionar a ordem dos produtos por Nome de A - Z', () => {
        cy.login_standardUser()
        cy.get('.product_sort_container').select('az')
        cy.get('.active_option').contains('Name (A to Z)')
    })

    it('Selecionar a ordem dos produtos por Nome de Z - A', () => {
        cy.login_standardUser()
        cy.get('.product_sort_container').select('za')
        cy.get('.active_option').contains('Name (Z to A)')
    })

    it('Selecionar a ordem dos produtos por Preço de baixo a alto', () => {
        cy.login_standardUser()
        cy.get('.product_sort_container').select('lohi')
        cy.get('.active_option').contains('Price (low to high)')
    })

    it('Selecionar a ordem dos produtos por Preço de alto a baixo', () => {
        cy.login_standardUser()
        cy.get('.product_sort_container').select('hilo')
        cy.get('.active_option').contains('Price (high to low)')
    })

    it('Carrinho com o produto removido deverá ter o total de itens como $0', () => {
        cy.login_standardUser();
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('button[class="btn btn_secondary btn_small cart_button"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('QA')
        cy.get('[data-test="lastName"]').type('Teste')
        cy.get('[data-test="postalCode"]').type('97229000')
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="total-label"]').contains('0.00').should('be.visible')
    })

    it('Realizar o Logout', () => {
        cy.login_standardUser()
        cy.get('#react-burger-menu-btn').click()
        cy.get('[data-test="logout-sidebar-link"]').click()
        cy.get('.login_logo').contains('Swag Labs').should('be.visible')
    })

    it('Erro ao finalizar ao inserir o LastName', () =>{
        cy.login_errorUser()
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('QA')
        Cypress.on('uncaught:exception', (err, runnable) => {
            cy.get('[data-test="lastName"]').type('Teste').should('be.empty')
            return false
        })
        cy.get('[data-test="postalCode"]').type('97229000')
        cy.get('[data-test="continue"]').click()
        Cypress.on('uncaught:exception', (err, runnable) => {
            cy.get('[data-test="finish"]').click()
            return true
        })
    })

    it('Impossibilita finalizar a compra do produto sem inserir o First Name', () =>{
        cy.login_standardUser()
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="lastName"]').type('Teste')
        cy.get('[data-test="postalCode"]').type('97229000')
        cy.get('[data-test="continue"]').click()
        cy.contains('Error: First Name is required').should('be.visible')
    })

    it('Impossibilita finalizar a compra do produto sem inserir o Last Name', () =>{
        cy.login_standardUser()
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('QA')
        cy.get('[data-test="postalCode"]').type('97229000')
        cy.get('[data-test="continue"]').click()
        cy.contains('Error: Last Name is required').should('be.visible')
    })

    it('Impossibilita finalizar a compra do produto sem inserir o Zip/Postal Code', () =>{
        cy.login_standardUser()
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('QA')
        cy.get('[data-test="lastName"]').type('Teste')
        cy.get('[data-test="continue"]').click()
        cy.contains('Error: Postal Code is required').should('be.visible')
    })

    it('Validar o acesso da página de Produto', () =>{
        cy.login_standardUser()
        cy.get('[data-test="item-4-title-link"] > [data-test="inventory-item-name"]').click()
        cy.contains('Sauce Labs Backpack').should('be.visible')
    })

})