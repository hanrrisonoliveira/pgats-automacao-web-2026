const seletores = {
  slider: 'section[id=slider]'
};

function validarPaginaInicial() {
  cy.get(seletores.slider).should('be.visible');
}

module.exports = {
  validarPaginaInicial
};
