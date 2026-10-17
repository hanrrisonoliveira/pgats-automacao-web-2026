const seletores = {
  usuarioAutenticado: '.navbar-nav li'
};

function validarUsuarioAutenticado(nome) {
  cy.get(seletores.usuarioAutenticado)
    .contains(`Logged in as ${nome}`)
    .should('be.visible');
}

module.exports = {
  validarUsuarioAutenticado
};
