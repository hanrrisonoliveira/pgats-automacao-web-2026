const seletores = {
  produtos: 'a[href="/products"]',
  tituloTodosProdutos: 'h2.title.text-center',
  campoBusca: '#search_product',
  botaoBusca: '#submit_search',
  produto: '.features_items .product-image-wrapper',
  visualizarProduto: 'a[href*="/product_details/"]',
  informacoesProduto: '.product-information',
  nomeProduto: '.product-information h2',
  categoria: '.product-information p',
  preco: '.product-information span span'
};

function acessarProdutos() {
  cy.get(seletores.produtos).click();
}

function validarPaginaTodosProdutos() {
  cy.get(seletores.tituloTodosProdutos)
    .should('be.visible')
    .and('contain', 'All Products');
}

function validarListaDeProdutos() {
  cy.get(seletores.produto)
    .should('have.length.greaterThan', 0)
    .and('be.visible');
}

function pesquisarProduto(nome) {
  cy.get(seletores.campoBusca).type(nome);
  cy.get(seletores.botaoBusca).click();
}

function validarProdutosPesquisados() {
  cy.get(seletores.tituloTodosProdutos)
    .should('be.visible')
    .and('contain', 'Searched Products');
}

function validarProdutosRelacionadosA(nome) {
  cy.get(seletores.produto)
    .should('have.length.greaterThan', 0)
    .each(($produto) => {
      cy.wrap($produto)
        .find('.productinfo p')
        .should('contain.text', nome);
    });
}

function abrirDetalhesDoPrimeiroProduto() {
  cy.get(seletores.visualizarProduto).first().click();
}

function validarPaginaDeDetalhesDoProduto() {
  cy.url().should('include', '/product_details/');
  cy.get(seletores.informacoesProduto).should('be.visible');
}

function validarDetalhesDoProduto() {
  cy.get(seletores.nomeProduto).should('be.visible');
  cy.get(seletores.categoria).contains('Category:').should('be.visible');
  cy.get(seletores.preco).should('be.visible');
  cy.get(seletores.categoria).contains('Availability:').should('be.visible');
  cy.get(seletores.categoria).contains('Condition:').should('be.visible');
  cy.get(seletores.categoria).contains('Brand:').should('be.visible');
}

module.exports = {
  acessarProdutos,
  validarPaginaTodosProdutos,
  validarListaDeProdutos,
  pesquisarProduto,
  validarProdutosPesquisados,
  validarProdutosRelacionadosA,
  abrirDetalhesDoPrimeiroProduto,
  validarPaginaDeDetalhesDoProduto,
  validarDetalhesDoProduto
};
