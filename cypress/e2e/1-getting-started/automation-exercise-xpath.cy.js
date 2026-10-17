/// <reference types="cypress" />

describe('Automation Exercise', () => {
  // Cadastro
  // cy.xpath() -> elementos baseados em XPath

  it('Cadastrar um novo usuário com sucesso', () => {
    cy.visit('https://www.automationexercise.com')
    cy.xpath('//a[contains(@href, "login")]').click()

    // const timestamp = new Date().getTime()

    cy.xpath('//*[@data-qa="signup-name"]').type(`PGATS Aut`)
    // cy.xpath('//*[@data-qa="signup-email"]').type(`pgats-aut-test-${timestamp}@mail.com`)
    cy.xpath('//*[@data-qa="signup-email"]').type(`pgats-aut-test-${Date.now()}@mail.com`)

    cy.xpath('//*[@data-qa="signup-button"]').click()

    // radio buttons -> check
    cy.xpath('//*[@id="id_gender2"]').check()

    cy.xpath('//*[@data-qa="password"]').type('12345')

    // Selects e Comboboxes -> select
    cy.xpath('//*[@data-qa="days"]').select('1')
    cy.xpath('//*[@data-qa="months"]').select('September')
    cy.xpath('//*[@data-qa="years"]').select('1990')

    // checkboxes -> check
    cy.xpath('//*[@id="newsletter"]').check()
    cy.xpath('//*[@id="optin"]').check()
    cy.xpath('//*[@data-qa="first_name"]').type('PGATS')
    cy.xpath('//*[@data-qa="last_name"]').type('Aut')
    cy.xpath('//*[@data-qa="company"]').type('PGATS')
    cy.xpath('//*[@data-qa="address"]').type('Example Address')

    cy.xpath('//*[@data-qa="country"]').select('United States')
    cy.xpath('//*[@data-qa="state"]').type('California')
    cy.xpath('//*[@data-qa="city"]').type('San Francisco')
    cy.xpath('//*[@data-qa="zipcode"]').type('12345')

    cy.xpath('//*[@data-qa="mobile_number"]').type('999999999')

    cy.xpath('//*[@data-qa="create-account"]').click()

    /**
     * 1 - IA gerando asserções tradicionais
     */

    cy.xpath('//*[@data-qa="create-account"]').click()
    cy.xpath('//*[@data-qa="account-created"]')
      .should('be.visible')
      .and('contain', 'Account Created!')


  });

  it('Efetuar Login de Usuário com email e senha corretos', () => {
    // ARRANGE
    /**
     * Ter uma conta para efetuar o Login
     * pgats-aut-test-1791030872114@mail.com / 12345
     */

    // acesso a página de login
    // Problema 1: Repetição do cy.visit
    cy.visit('https://www.automationexercise.com/login')

    // ACT
    cy.xpath('//*[@data-qa="login-email"]').type('pgats-aut-test-1791030872114@mail.com')
    cy.xpath('//*[@data-qa="login-password"]').type('12345')

    cy.xpath('//*[@data-qa="login-button"]').click()
    // cy.xpath('//*[contains(normalize-space(.), "Login")]')

    // ASSERT
    // cy.xpath('//a').should('contain', 'PGATS Aut')
    // cy.xpath('//a/b').should('contain', 'PGATS Aut')


    // 
    // cy.xpath('//*[contains(normalize-space(.), "Logged in as PGATS Auto")]').should('be.visible')
    cy.xpath('//ul[contains(concat(" ", normalize-space(@class), " "), " navbar-nav ")]//li[contains(normalize-space(.), "PGATS Aut")]')

    cy.xpath('//ul[contains(concat(" ", normalize-space(@class), " "), " navbar-nav ")]//li[contains(normalize-space(.), "PGATS Aut")]')
      .should('be.visible')

  });

  it('Efetuar Login de Usuário email e senha INCORRETOS', () => {
    cy.visit('https://www.automationexercise.com/login')

    // ACT
    cy.xpath('//*[@data-qa="login-email"]').type('pgats-aut-test-1791030872114@mail.com')
    cy.xpath('//*[@data-qa="login-password"]').type('54321')

    cy.xpath('//*[@data-qa="login-button"]').click()

    cy.xpath('//form[contains(@action, "login")]/p')
      .should('exist')
      .should('be.visible')
      .should('contain', 'Your email or password is incorrect!')
      .and('contain.text', 'Your email or password is incorrect!')

  });

  it('Efetuar Logout', () => {
    cy.visit('https://www.automationexercise.com/login')

    // ACT
    cy.xpath('//*[@data-qa="login-email"]').type('pgats-aut-test-1791030872114@mail.com')
    cy.xpath('//*[@data-qa="login-password"]').type('12345')
    cy.xpath('//*[@data-qa="login-button"]').click()

    // assert do login
    cy.xpath('//a[contains(@href, "logout")]')
      .should('be.visible')
      .click()

    cy.xpath('//*[contains(concat(" ", normalize-space(@class), " "), " login-form ")]/h2').should('be.visible')
    cy.xpath('//a[contains(@href, "logout")]').should('not.exist')
    cy.xpath('//*[contains(@action, "login")]').should('be.visible');
    cy.url().should('include', 'login')

    // https://www.automationexercise.com/login -> 'login'

  });

  it('Tentar cadastrar usuário com e-mail já cadastrado', () => {
    cy.visit('https://www.automationexercise.com')
    cy.xpath('//a[contains(@href, "login")]').click()

    // const timestamp = new Date().getTime()

    cy.xpath('//*[@data-qa="signup-name"]').type(`PGATS Aut`)
    // cy.xpath('//*[@data-qa="signup-email"]').type(`pgats-aut-test-${timestamp}@mail.com`)
    cy.xpath('//*[@data-qa="signup-email"]').type(`pgats-aut-test-1791030872114@mail.com`)

    cy.xpath('//*[@data-qa="signup-button"]').click()

    cy.xpath('//form[contains(@action, "signup")]//p')
      .should('exist')
      .should('be.visible')
      .should('contain', 'Email Address already exist!')
      .and('contain.text', 'Email Address already exist!')


  });

});
