Cypress.Commands.add('login_standardUser', () => {
    cy.fixture('example').then((users) => {
      const user = users.standardUser;
      cy.get('[data-test="username"]').type(user.username)
      cy.get('[data-test="password"]').type(user.password)
      cy.get('[data-test="login-button"]').click()
      cy.get('[data-test="title"]').should('be.visible')
    })
  })
  
Cypress.Commands.add('login_lockedOutUser', () => {
    cy.fixture('example').then((users) => {
      const user = users.lockedOutUser;
      cy.get('[data-test="username"]').type(user.username)
      cy.get('[data-test="password"]').type(user.password)
      cy.get('[data-test="login-button"]').click()
    })
})

Cypress.Commands.add('login_problemUser', () => {
    cy.fixture('example').then((users) => {
      const user = users.problemUser;
      cy.get('[data-test="username"]').type(user.username)
      cy.get('[data-test="password"]').type(user.password)
      cy.get('[data-test="login-button"]').click()
    })
})

Cypress.Commands.add('page', () =>{
    cy.fixture('example').then((page) =>{
        const main = page.url
        cy.visit(main.swag_labs)
    })
})

Cypress.Commands.add('login_errorUser', () =>{
  cy.fixture('example').then((users) => {
    const user = users.errorUser;
    cy.get('[data-test="username"]').type(user.username)
    cy.get('[data-test="password"]').type(user.password)
    cy.get('[data-test="login-button"]').click()
  })
})

Cypress.Commands.add('buy_a_product', () =>{
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
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