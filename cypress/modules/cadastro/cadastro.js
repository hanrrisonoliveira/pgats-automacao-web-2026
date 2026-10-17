const seletores = {
  acessoCadastro: 'a[href*=login]',
  nome: '[data-qa="signup-name"]',
  email: '[data-qa="signup-email"]',
  iniciarCadastro: '[data-qa="signup-button"]',
  genero: '#id_gender2',
  senha: '[data-qa="password"]',
  diaNascimento: '[data-qa="days"]',
  mesNascimento: '[data-qa="months"]',
  anoNascimento: '[data-qa="years"]',
  newsletter: '#newsletter',
  ofertas: '#optin',
  primeiroNome: '[data-qa="first_name"]',
  sobrenome: '[data-qa="last_name"]',
  empresa: '[data-qa="company"]',
  endereco: '[data-qa="address"]',
  pais: '[data-qa="country"]',
  estado: '[data-qa="state"]',
  cidade: '[data-qa="city"]',
  cep: '[data-qa="zipcode"]',
  telefone: '[data-qa="mobile_number"]',
  criarConta: '[data-qa="create-account"]',
  contaCriada: '[data-qa="account-created"]',
  continuar: '[data-qa="continue-button"]',
  excluirConta: 'a[href="/delete_account"]',
  contaExcluida: '[data-qa="account-deleted"]'
};

function iniciarCadastro(usuario) {
  cy.get(seletores.acessoCadastro).click();
  cy.get(seletores.nome).type(usuario.nome);
  cy.get(seletores.email).type(usuario.email);
  cy.get(seletores.iniciarCadastro).click();
}

function preencherDadosDaConta(usuario) {
  cy.get(seletores.genero).check();
  cy.get(seletores.senha).type(usuario.senha);
  cy.get(seletores.diaNascimento).select(usuario.dataNascimento.dia);
  cy.get(seletores.mesNascimento).select(usuario.dataNascimento.mes);
  cy.get(seletores.anoNascimento).select(usuario.dataNascimento.ano);
  cy.get(seletores.newsletter).check();
  cy.get(seletores.ofertas).check();
  cy.get(seletores.primeiroNome).type(usuario.endereco.nome);
  cy.get(seletores.sobrenome).type(usuario.endereco.sobrenome);
  cy.get(seletores.empresa).type(usuario.endereco.empresa);
  cy.get(seletores.endereco).type(usuario.endereco.endereco);
  cy.get(seletores.pais).select(usuario.endereco.pais);
  cy.get(seletores.estado).type(usuario.endereco.estado);
  cy.get(seletores.cidade).type(usuario.endereco.cidade);
  cy.get(seletores.cep).type(usuario.endereco.cep);
  cy.get(seletores.telefone).type(usuario.endereco.telefone);
}

function criarConta() { 
  cy.get(seletores.criarConta).click(); 
}

function validarContaCriada() {
  cy.get(seletores.contaCriada).should('be.visible').and('contain', 'Account Created!');
}

function continuar() { 
  cy.get(seletores.continuar).click(); 
}

function excluirConta() {
  cy.get(seletores.excluirConta).should('be.visible').and('contain', 'Delete Account').click();
}

function validarContaExcluida() {
  cy.get(seletores.contaExcluida).should('be.visible').and('contain', 'Account Deleted!');
}

module.exports = {
  iniciarCadastro,
  preencherDadosDaConta,
  criarConta,
  validarContaCriada,
  continuar,
  excluirConta,
  validarContaExcluida
};
