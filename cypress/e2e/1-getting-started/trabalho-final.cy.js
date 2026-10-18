/// <reference types="cypress" />

const cadastro = require('../../modules/cadastro/cadastro')
const { faker } = require('@faker-js/faker')
const login = require('../../modules/login/login')
const usuarioModulo = require('../../modules/usuario/usuario')
const paginaInicial = require('../../modules/pagina-inicial/pagina-inicial')
const produto = require('../../modules/produto/produto')
const assinatura = require('../../modules/assinatura/assinatura')
const pedido = require('../../modules/pedido/pedido')

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

    cy.visit('/')
    paginaInicial.validarPaginaInicial()

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

    cy.visit('/')
    paginaInicial.validarPaginaInicial()
    login.acessarLogin()
    login.efetuarLogin('pgats-aut-test-1791030872114@mail.com', '12345')

    usuarioModulo.validarUsuarioAutenticado('PGATS Aut')

  });

  it('Test Case 3: Login User with incorrect email and password', () => {
    cy.visit('/')
    paginaInicial.validarPaginaInicial()
    login.acessarLogin()

    login.efetuarLogin('pgats-aut-test-1791030872114@mail.com', '54321')
    login.validarMensagemDeErro()

  });

  it('Test Case 4: Logout User', () => {
    cy.visit('/')
    paginaInicial.validarPaginaInicial()
    login.acessarLogin()
    login.efetuarLogin('pgats-aut-test-1791030872114@mail.com', '12345')
    login.efetuarLogout()
    login.validarLogout()

  });

  it('Test Case 5: Register User with existing email', () => {
    cy.visit('/')
    paginaInicial.validarPaginaInicial()
    login.acessarLogin()
    cadastro.iniciarCadastro({
      nome: 'PGATS Aut',
      email: 'pgats-aut-test-1791030872114@mail.com'
    })
    cadastro.validarEmailJaCadastrado()

  });

  it('Test Case 8: Verify All Products and product detail page', () => {
    cy.visit('/')
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

    cy.visit('/')
    paginaInicial.validarPaginaInicial()
    produto.acessarProdutos()
    produto.validarPaginaTodosProdutos()
    produto.pesquisarProduto(produtoPesquisado)
    produto.validarProdutosPesquisados()
    produto.validarProdutosRelacionadosA(produtoPesquisado)
  })

  it('Test Case 10: Verify Subscription in home page', () => {
    const email = faker.internet.email().toLowerCase()

    cy.visit('/')
    paginaInicial.validarPaginaInicial()
    assinatura.rolarAteRodape()
    assinatura.validarTextoDeAssinatura()
    assinatura.assinar(email)
    assinatura.validarAssinaturaRealizada()
  })

  it('Test Case 15: Place Order: Register before Checkout', () => {
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
    const pagamento = {
      nome: faker.person.fullName(),
      numero: faker.string.numeric(16),
      cvc: faker.string.numeric(3),
      mes: '12',
      ano: '2030'
    }

    cy.visit('/')
    paginaInicial.validarPaginaInicial()
    cadastro.iniciarCadastro(usuario)
    cadastro.preencherDadosDaConta(usuario)
    cadastro.criarConta()
    cadastro.validarContaCriada()
    cadastro.continuar()
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

})
