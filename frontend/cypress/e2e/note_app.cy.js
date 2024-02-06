describe('Notes App', function() {
  // Before each function, we should hard reset everything in the database
  beforeEach(function() {
    cy.request('GET','http://localhost:8420/v1/test/reset')
    const user = {
      name: 'test_user',
      username: 'test_user',
      password: 'test_password'
    }
    cy.request('POST', 'http://localhost:8420/v1/users', user)
    cy.visit('http://localhost:5173')
  })

  // Front page should be the log in page at this point
  it('front page can be opened', function() {
    cy.contains('Sign up')
  })

  it('login form can be opened', function() {
    cy.get('input:first').type('test_user')
    cy.get('input:last').type('test_password')
    cy.contains('Login').click()

    // if we see the 'ADD' button, that means we've logged in.
    cy.contains('Add')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test_user', password: 'test_password' })
    })

    it('a new note can be created', function() {
      cy.get('input:first').type('jobava london is fun')
      cy.contains('Add').click()
      cy.contains('jobava london is fun')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({ content: 'Kings indian samisch variation is fun', important: false})
        cy.createNote({ content: 'Modern scandi is fun', important: false})
        cy.createNote({ content: 'portugese / icelandic gambit is fun', important: false})
      })

      it('one of those can be made important', function () {
        cy.contains('samisch').parent().trigger('mouseover')
        cy.get('#pin_button').click()
      })
    })
  })
})
