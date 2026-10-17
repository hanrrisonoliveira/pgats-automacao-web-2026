const seletores = {
  email: '[data-qa="login-email"]',
  senha: '[data-qa="login-password"]',
  botaoEntrar: '[data-qa="login-button"]',
  mensagemErro: 'form[action*="login"] > p'
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

module.exports = {
  acessarLogin,
  efetuarLogin,
  validarMensagemDeErro
};
