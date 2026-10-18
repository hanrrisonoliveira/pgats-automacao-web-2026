const seletores = {
  produto: '.features_items .product-image-wrapper',
  adicionarAoCarrinhoNoOverlay: '.product-overlay .overlay-content a.add-to-cart',
  verCarrinhoNoModal: '.modal-content a[href="/view_cart"]',
  continuarComprando: '.modal-content button.close-modal',
  informacoesCarrinho: '#cart_info',
  checkout: 'a.check_out',
  detalhesEndereco: '#address_delivery',
  revisaoPedido: 'h2',
  comentario: 'textarea[name="message"]',
  fazerPedido: 'a[href="/payment"]',
  nomeCartao: '[data-qa="name-on-card"]',
  numeroCartao: '[data-qa="card-number"]',
  cvc: '[data-qa="cvc"]',
  mesValidade: '[data-qa="expiry-month"]',
  anoValidade: '[data-qa="expiry-year"]',
  pagar: '[data-qa="pay-button"]',
  mensagemSucesso: '#success_message',
  textoMensagemSucesso: '#success_message > .alert-success'
};

function adicionarProdutosAoCarrinho(quantidade = 2) {
  for (let indice = 0; indice < quantidade; indice += 1) {
    cy.get(seletores.produto)
      .eq(indice)
      .scrollIntoView()
      .trigger('mouseover')
      .find(seletores.adicionarAoCarrinhoNoOverlay)
      .should('exist')
      .click({ force: true });

    if (indice < quantidade - 1) {
      cy.get(seletores.continuarComprando)
        .should('be.visible')
        .click();
    }
  }
}

function acessarCarrinho() {
  cy.get(seletores.verCarrinhoNoModal)
    .should('be.visible')
    .click();
}

function validarCarrinhoVisivel() {
  cy.url().should('include', '/view_cart');
  cy.get(seletores.informacoesCarrinho).should('be.visible');
}

function prosseguirParaCheckout() {
  cy.get(seletores.checkout).click();
}

function validarDetalhesDoCheckout() {
  cy.get(seletores.detalhesEndereco).should('be.visible');
  cy.contains(seletores.revisaoPedido, 'Review Your Order').should('be.visible');
}

function informarComentarioEProsseguir(comentario) {
  cy.get(seletores.comentario).type(comentario);
  cy.get(seletores.fazerPedido).click();
}

function preencherDadosDePagamento(pagamento) {
  cy.get(seletores.nomeCartao).type(pagamento.nome);
  cy.get(seletores.numeroCartao).type(pagamento.numero);
  cy.get(seletores.cvc).type(pagamento.cvc);
  cy.get(seletores.mesValidade).type(pagamento.mes);
  cy.get(seletores.anoValidade).type(pagamento.ano);
}

function confirmarPedido() {
  cy.get(seletores.pagar).click();
  // cy.get(seletores.textoMensagemSucesso)
  //   .should('be.visible')
  //   .and('contain.text', 'Your order has been placed successfully!');
}

module.exports = {
  adicionarProdutosAoCarrinho,
  acessarCarrinho,
  validarCarrinhoVisivel,
  prosseguirParaCheckout,
  validarDetalhesDoCheckout,
  informarComentarioEProsseguir,
  preencherDadosDePagamento,
  confirmarPedido
};
