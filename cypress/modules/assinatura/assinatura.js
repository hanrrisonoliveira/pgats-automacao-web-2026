const seletores = {
  rodape: '#footer',
  tituloAssinatura: '#footer h2',
  email: '#susbscribe_email',
  botaoAssinar: '#subscribe',
  mensagemSucesso: '#footer .alert-success'
};

function rolarAteRodape() {
  cy.get(seletores.rodape).scrollIntoView();
}

function validarTextoDeAssinatura() {
  cy.get(seletores.tituloAssinatura)
    .should('be.visible')
    .and('contain', 'Subscription');
}

function assinar(email) {
  cy.get(seletores.email).type(email);
  cy.get(seletores.botaoAssinar).click();
}

function validarAssinaturaRealizada() {
  cy.get(seletores.mensagemSucesso)
    .should('be.visible')
    .and('contain', 'You have been successfully subscribed!');
}

module.exports = {
  rolarAteRodape,
  validarTextoDeAssinatura,
  assinar,
  validarAssinaturaRealizada
};
