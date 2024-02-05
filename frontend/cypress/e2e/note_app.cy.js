describe('Notes App', function() {
  // Before each function, we should hard reset everything in the database
  beforeEach(function() {
    cy.request('GET','http://localhost:8420/v1/test/reset')
    const user = {
      name: 'test_user',
      username: 'test_user',
      password: 'test_password'
    }
    cy.request('POST', 'http://localhost:8420/v1/user', user)
    cy.visit('')
  })

  // Front page should be the log in page at this point
  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Login')
  })

  it('login form can be opened', function() {
    cy.get('input:first').type('test')
    cy.get('input:last').type('test')
    cy.contains('Login').click()

    // if we see the 'ADD' button, that means we've logged in.
    cy.contains('Add')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('a new note can be created', function() {
      cy.get('input').type('a note created by cypress')
      cy.contains('Add').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      // it('one of those can be made important', function () {
      //   cy.contains('second note').parent().find('button').as('theButton')
      //   cy.get('@theButton').click()
      //   cy.get('@theButton').should('contain', 'make not important')
      // })
    })
  })

  // it('login fails with wrong password', function() {
  //   cy.contains('log in').click()
  //   cy.get('#username').type('mluukkai')
  //   cy.get('#password').type('wrong')
  //   cy.get('#login-button').click()

  //   cy.get('.error')
  //     .should('contain', 'wrong credentials')
  //     .and('have.css', 'color', 'rgb(255, 0, 0)')
  //     .and('have.css', 'border-style', 'solid')
  // })
})
