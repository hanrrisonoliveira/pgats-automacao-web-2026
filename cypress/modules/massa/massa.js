const { faker } = require('@faker-js/faker')

function gerarUsuario() {
  const primeiroNome = faker.person.firstName()
  const sobrenome = faker.person.lastName()

  return {
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
}

function gerarPagamento() {
  return {
    nome: faker.person.fullName(),
    numero: faker.string.numeric(16),
    cvc: faker.string.numeric(3),
    mes: '12',
    ano: '2030'
  }
}

module.exports = {
  gerarUsuario,
  gerarPagamento
}
