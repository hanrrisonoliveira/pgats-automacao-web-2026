/// <reference types="cypress" />

const cadastro = require('../../modules/cadastro/cadastro')
const login = require('../../modules/login/login')
const usuarioModulo = require('../../modules/usuario/usuario')
const paginaInicial = require('../../modules/pagina-inicial/pagina-inicial')
const produto = require('../../modules/produto/produto')
const assinatura = require('../../modules/assinatura/assinatura')
const pedido = require('../../modules/pedido/pedido')
const massa = require('../../modules/massa/massa')

beforeEach(() => {
    cy.visit('/')
})

describe('Automation Exercise', () => {
  it('Test Case 1: Register User', () => {
    const usuario = massa.gerarUsuario()

    paginaInicial.validarPaginaInicial()
    cadastro.cadastrarUsuario(usuario)
    usuarioModulo.validarUsuarioAutenticado(usuario.nome)
    cadastro.excluirConta()
    cadastro.validarContaExcluida()
    cadastro.continuar()

  });

  it('Test Case 2: Login User with correct email and password', () => {
    const usuario = massa.gerarUsuario()

    cadastro.cadastrarUsuario(usuario)
    login.efetuarLogout()
    cy.visit('/')
    paginaInicial.validarPaginaInicial()
    login.acessarLogin()
    login.efetuarLogin(usuario.email, usuario.senha)
    usuarioModulo.validarUsuarioAutenticado(usuario.nome)

  });

  it('Test Case 3: Login User with incorrect email and password', () => {
    const email = massa.gerarUsuario().email

    login.acessarLogin()
    login.efetuarLogin(email, '54321')
    login.validarMensagemDeErro()

  });

  it('Test Case 4: Logout User', () => {
    const usuario = massa.gerarUsuario()

    cadastro.cadastrarUsuario(usuario)
    login.efetuarLogout()
    cy.visit('/')
    paginaInicial.validarPaginaInicial()
    login.acessarLogin()
    login.efetuarLogin(usuario.email, usuario.senha)
    login.efetuarLogout()
    login.validarLogout()

  });

  it('Test Case 5: Register User with existing email', () => {
    const usuario = massa.gerarUsuario()

    cadastro.cadastrarUsuario(usuario)
    login.efetuarLogout()
    cy.visit('/')
    paginaInicial.validarPaginaInicial()
    login.acessarLogin()
    cadastro.iniciarCadastro({ nome: usuario.nome, email: usuario.email })
    cadastro.validarEmailJaCadastrado()

  });

  it('Test Case 8: Verify All Products and product detail page', () => {
    paginaInicial.validarPaginaInicial()
    produto.acessarProdutos()
    produto.validarPaginaTodosProdutos()
    produto.validarListaDeProdutos()
    produto.abrirDetalhesDoPrimeiroProduto()
    produto.validarPaginaDeDetalhesDoProduto()
    produto.validarDetalhesDoProduto()
  })

  it('Test Case 9: Search Product', () => {
    const produtoPesquisado = 'Fancy Green Top'

    paginaInicial.validarPaginaInicial()
    produto.acessarProdutos()
    produto.validarPaginaTodosProdutos()
    produto.pesquisarProduto(produtoPesquisado)
    produto.validarProdutosPesquisados()
    produto.validarProdutosRelacionadosA(produtoPesquisado)
  })

  it('Test Case 10: Verify Subscription in home page', () => {
    const email = massa.gerarUsuario().email

    paginaInicial.validarPaginaInicial()
    assinatura.rolarAteRodape()
    assinatura.validarTextoDeAssinatura()
    assinatura.assinar(email)
    assinatura.validarAssinaturaRealizada()
  })

  it('Test Case 15: Place Order: Register before Checkout', () => {
    const usuario = massa.gerarUsuario()
    const pagamento = massa.gerarPagamento()

    paginaInicial.validarPaginaInicial()
    cadastro.cadastrarUsuario(usuario)
    usuarioModulo.validarUsuarioAutenticado(usuario.nome)
    produto.acessarProdutos()
    produto.validarPaginaTodosProdutos()
    pedido.adicionarProdutosAoCarrinho()
    pedido.acessarCarrinho()
    pedido.validarCarrinhoVisivel()
    pedido.prosseguirParaCheckout()
    pedido.validarDetalhesDoCheckout()
    pedido.informarComentarioEProsseguir('Pedido criado pelo Test Case 15')
    pedido.preencherDadosDePagamento(pagamento)
    pedido.confirmarPedido()
    cadastro.excluirConta()
    cadastro.validarContaExcluida()
    cadastro.continuar()
  })

  it('Test Case 16: Place Order: Login before Checkout', () => {
    const usuario = massa.gerarUsuario()
    const pagamento = massa.gerarPagamento()

    cadastro.cadastrarUsuario(usuario)
    login.efetuarLogout()
    cy.visit('/')
    paginaInicial.validarPaginaInicial()
    login.acessarLogin()
    login.efetuarLogin(usuario.email, usuario.senha)
    usuarioModulo.validarUsuarioAutenticado(usuario.nome)
    produto.acessarProdutos()
    produto.validarPaginaTodosProdutos()
    pedido.adicionarProdutosAoCarrinho()
    pedido.acessarCarrinho()
    pedido.validarCarrinhoVisivel()
    pedido.prosseguirParaCheckout()
    pedido.validarDetalhesDoCheckout()
    pedido.informarComentarioEProsseguir('Pedido criado pelo Test Case 16')
    pedido.preencherDadosDePagamento(pagamento)
    pedido.confirmarPedido()
    cadastro.excluirConta()
    cadastro.validarContaExcluida()
    cadastro.continuar()
  })

})
