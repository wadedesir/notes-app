describe('Note app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:5173')
  })
  it('user can log in', function() {
    cy.get('input:first').type('test')
    cy.get('input:last').type('test')
    cy.contains('Login').click()
    // the add button only shows up on the logged in home page
    cy.contains('Add')
  })
  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('input:first').type('test')
      cy.get('input:last').type('test')
      cy.contains('Login').click()
    })

    it('a new note can be created', function() {
      cy.get('input').type('my e2e note')
      cy.contains('Add').click()
      cy.contains('my e2e note')
    })
  })
})
