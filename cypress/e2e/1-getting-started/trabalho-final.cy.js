/// <reference types="cypress" />

const cadastro = require('../../modules/cadastro/cadastro')
const { faker } = require('@faker-js/faker')
const login = require('../../modules/login/login')
const usuarioModulo = require('../../modules/usuario/usuario')

describe('Automation Exercise', () => {
  it('Test Case 1: Register User', () => {
    const primeiroNome = faker.person.firstName()
    const sobrenome = faker.person.lastName()

    const usuario = {
      nome: `${primeiroNome} ${sobrenome}`,
      email: faker.internet.email({ firstName: primeiroNome, lastName: sobrenome }).toLowerCase(),
      senha: '12345',
      dataNascimento: { dia: '1', mes: 'September', ano: '1990' },
      endereco: {
        nome: primeiroNome,
        sobrenome,
        empresa: faker.company.name(),
        endereco: faker.location.streetAddress(),
        pais: 'United States',
        estado: faker.location.state(),
        cidade: faker.location.city(),
        cep: faker.string.numeric(5),
        telefone: faker.string.numeric(9)
      }
    }

    login.acessarLogin()
    cadastro.iniciarCadastro(usuario)

    cadastro.preencherDadosDaConta(usuario)
    cadastro.criarConta()

    cadastro.validarContaCriada()

    cadastro.continuar()
    usuarioModulo.validarUsuarioAutenticado(usuario.nome)
    cadastro.excluirConta()
    cadastro.validarContaExcluida()
    cadastro.continuar()

  });

  it('Test Case 2: Login User with correct email and password', () => {

    login.acessarLogin()
    login.efetuarLogin('pgats-aut-test-1791030872114@mail.com', '12345')

    usuarioModulo.validarUsuarioAutenticado('PGATS Aut')

  });

  it.only('Test Case 3: Login User with incorrect email and password', () => {
    login.acessarLogin()

    login.efetuarLogin('pgats-aut-test-1791030872114@mail.com', '54321')
    login.validarMensagemDeErro()

  });

  it('Test Case 4: Logout User', () => {
    cy.visit('https://www.automationexercise.com/login')

    // ACT
    cy.get('[data-qa="login-email"]').type('pgats-aut-test-1791030872114@mail.com')
    cy.get('[data-qa="login-password"]').type('12345')
    cy.get('[data-qa="login-button"]').click()

    // assert do login
    cy.get('a[href*="logout"]')
      .should('be.visible')
      .click()

    cy.get('.login-form > h2').should('be.visible')
    cy.get('a[href*="logout"]').should('not.exist')
    cy.get('[action*="login"]').should('be.visible');
    cy.url().should('include', 'login')

    // https://www.automationexercise.com/login -> 'login'

  });

  it('Test Case 5: Register User with existing email', () => {
    cy.visit('https://www.automationexercise.com')
    cy.get('a[href*=login]').click()

    // const timestamp = new Date().getTime()

    cy.get('[data-qa="signup-name"]').type(`PGATS Aut`)
    // cy.get('[data-qa="signup-email"]').type(`pgats-aut-test-${timestamp}@mail.com`)
    cy.get('[data-qa="signup-email"]').type(`pgats-aut-test-1791030872114@mail.com`)

    cy.get('[data-qa="signup-button"]').click()

    cy.get('form[action*=signup] p')
      .should('exist')
      .should('be.visible')
      .should('contain', 'Email Address already exist!')
      .and('contain.text', 'Email Address already exist!')


  });

})
