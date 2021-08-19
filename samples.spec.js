/// <reference types = 'cypress'/>

describe ('Login tests', ()=> {

   beforeEach(() => {
      cy.visit('https://demoqa.com/login')
   })

   it ('Making a invalid login' , ()=>{
       makeLogin('Invalid', 'PassInvalid')
       cy.location('pathname').should('eq', '/login')

    })

    it ('Making a valid login', ()=>{
        makeLogin('carlin', 'Admin3212#')
        cy.location('pathname').should('eq', '/profile')
    })


})

describe.only ('Other tests', ()=>{
  it ('Manipulating menus', ()=>{
        cy.visit('https://demoqa.com/menu')
        //Getting the <ul>
        cy.get('#nav li').should('have.length', 8)
        cy.get('#nav li').first().should('have.text', 'Main Item 1')
        cy.get('#nav li').last().should('have.text', 'Main Item 3')
    })

    it ('Typing commands', ()=>{
        cy.visit('https://demoqa.com/automation-practice-form')
        //Erase a letter and scroll down
        cy.get('#firstName').type('Carlos{backspace}{pagedown}', {delay:300})
    })

    it('Using contains to get an element', ()=>{
        cy.visit('https://demoqa.com/automation-practice-form')
        cy.contains('Male').click()
    })

})

function makeLogin(user, pass) {
       cy.get('input[placeholder="UserName"]').type(user)
       .should('have.value', user)

       cy.get('input[placeholder="Password"]').type(pass)
       .should('have.value', pass)

       cy.get('#login').click()
}