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