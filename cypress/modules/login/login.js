const seletores = {
  email: '[data-qa="login-email"]',
  senha: '[data-qa="login-password"]',
  botaoEntrar: '[data-qa="login-button"]',
  mensagemErro: 'form[action*="login"] > p',
  sair: 'a[href*="logout"]',
  tituloLogin: '.login-form h2',
  formularioLogin: '[action*="login"]'
};

function acessarLogin() {
  cy.visit('https://www.automationexercise.com/login');
}

function efetuarLogin(email, senha) {
  cy.get(seletores.email).type(email);
  cy.get(seletores.senha).type(senha);
  cy.get(seletores.botaoEntrar).click();
}

function validarMensagemDeErro() {
  cy.get(seletores.mensagemErro)
    .should('be.visible')
    .and('contain', 'Your email or password is incorrect!');
}

function efetuarLogout() {
  cy.get(seletores.sair).should('be.visible').click();
}

function validarLogout() {
  cy.get(seletores.tituloLogin).should('be.visible');
  cy.get(seletores.sair).should('not.exist');
  cy.get(seletores.formularioLogin).should('be.visible');
  cy.url().should('include', 'login');
}

module.exports = {
  acessarLogin,
  efetuarLogin,
  validarMensagemDeErro,
  efetuarLogout,
  validarLogout
};
