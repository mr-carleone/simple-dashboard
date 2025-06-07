describe('Login Page', () => {
    beforeEach(() => {
        cy.visit('/login')
    })

    it('should display login form', () => {
        cy.get('form').should('exist')
        cy.get('input[type="email"]').should('exist')
        cy.get('input[type="password"]').should('exist')
        cy.get('button[type="submit"]').should('exist')
    })

    it('should show error with invalid credentials', () => {
        cy.get('input[type="email"]').type('invalid@example.com')
        cy.get('input[type="password"]').type('wrongpassword')
        cy.get('button[type="submit"]').click()
        cy.get('.error-message').should('be.visible')
    })
})
