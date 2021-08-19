/// <reference types = 'cypress' />

describe ('Testing elements', ()=>{

  beforeEach (()=>{
    cy.visit("https://example.cypress.io/commands/actions")
  })

  it ('Typing..', ()=> {
    //Typing in a input element
    cy.get('#email1').type('emailfalso@mail.com', {delay:150})
      .should('have.value', 'emailfalso@mail.com')

      //Clean up and type other thing
      .clear().type('outrofake@mail.com{backspace}{backspace}', {})

    cy.get('textarea[disabled]').type('Forcing typing', {force:true})
      .should('have.value', 'Forcing typing')
  })

  it ('Focusing a element', ()=>{

    cy.get('input[placeholder="Password"]').focus().should('have.class', 'focus')
      .prev().should('have.attr','style', 'color: orange;')

    cy.get('#fullName1').type('Typing something', {delay:100})
      .should('have.value', 'Typing something').blur().should('have.class', 'error')
      .prev().should('have.attr', 'style', 'color: red;')

  })

  it('Clean up a element', ()=>{

    cy.get('#description').type('Typing something..',{delay:50})
      .should('have.value', "Typing something..").clear().should('be.empty')

  })

  it ('Submit', ()=>{

    //Using enter button
    cy.get('#couponCode1').type('Im typing{enter}')
      .should('have.value', 'Im typing').clear()
    //Validation
    cy.get('.action-form').next().should('have.text','Your form has been submitted!')
    cy.reload()
    //Using now the submit command (Form)
    cy.get('#couponCode1').type('Typing for submit', {delay:25,log:true})
    .should('have.value', 'Typing for submit')
    //Validation
    cy.get('.action-form').submit().next().should('have.text','Your form has been submitted!')
  })

  it ('Buttons and clicks', ()=>{

    cy.contains('Click to toggle popover').click()
    .next().should('have.class', 'popover')

    //Canvas to illustrate click positions
    cy.get('#action-canvas').click().click('topRight').click('topLeft').click('bottom')

    //Multiple clicks
    cy.get('.action-labels> .label').should('have.length', 6).click({multiple:true})

    //Ignoring error
    cy.get('.action-opacity').click({force:true})

    //Double clicks
    cy.contains('Double click to edit').dblclick()
    cy.get('.action-input-hidden').clear().type("i'm typing now",{delay:23, log:true})

    //Right click
    cy.contains('Right click to edit').rightclick().next().clear().type('Typing something...')
      .should('have.value', "Typing something...")

  })

  it ('Checkbox and radios', ()=>{

    cy.get('.action-checkboxes input[type="checkbox"]').not('[disabled]').check()
      .should('be.checked')

    cy.get('.action-multiple-checkboxes input[type="checkbox"]').check('checkbox1')
      .should('be.checked')

    cy.get('.well input[disabled]').check({force:true}).should('have.length', 3)
      .should('be.checked')

    //Unchecking
    cy.get('.action-check input[type="checkbox"]').not('[disabled]').uncheck().
      should('not.be.checked')

  })

  it.only ('Select', ()=>{

    cy.get('.action-select').should('have.value', '--Select a fruit--')
      .select('apples').should('have.value', 'fr-apples')

    cy.get('.action-select-multiple').select(['apples', 'oranges', 'bananas']).
      invoke('val').should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas'])

    cy.get('.action-select-multiple').invoke('val').should('include', 'fr-bananas')
  })

  it.only('Scroll into view', ()=>{

      cy.get('#scroll-horizontal button').scrollIntoView().should('be.visible')

      cy.get('#scroll-both button').scrollIntoView().should('be.visible')
  })

})
