// Model - regras de dados e persistencia das reservas (localStorage)
var ReservaModel = (function () {
  var CHAVE = 'garageControl.reservas';
  var TOTAL_VAGAS = 20;

  // Dados ficticios usados na primeira execucao
  var DADOS_INICIAIS = [
    { id: 1, placa: 'ABC1D23', proprietario: 'Ana Souza', apartamento: '101', bloco: 'A', modelo: 'Fiat Argo', cor: 'Branco', vaga: 1 },
    { id: 2, placa: 'EFG4H56', proprietario: 'Bruno Lima', apartamento: '202', bloco: 'A', modelo: 'Honda Civic', cor: 'Preto', vaga: 2 },
    { id: 3, placa: 'HIJ7K89', proprietario: 'Carla Dias', apartamento: '305', bloco: 'B', modelo: 'VW Gol', cor: 'Prata', vaga: 5 },
    { id: 4, placa: 'LMN0P12', proprietario: 'Diego Alves', apartamento: '12', bloco: 'C', modelo: 'Toyota Corolla', cor: 'Cinza', vaga: 8 },
    { id: 5, placa: 'QRS3T45', proprietario: 'Elisa Rocha', apartamento: '408', bloco: 'B', modelo: 'Hyundai HB20', cor: 'Vermelho', vaga: 11 }
  ];

  function ler() {
    var bruto = localStorage.getItem(CHAVE);
    if (bruto === null) {
      gravar(DADOS_INICIAIS);
      return DADOS_INICIAIS.slice();
    }
    return JSON.parse(bruto);
  }

  function gravar(lista) {
    localStorage.setItem(CHAVE, JSON.stringify(lista));
  }

  function proximoId(lista) {
    var maior = 0;
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].id > maior) { maior = lista[i].id; }
    }
    return maior + 1;
  }

  // Lista todas as reservas cadastradas
  function listar() {
    return ler();
  }

  function buscarPorVaga(numeroVaga) {
    var lista = ler();
    for (var i = 0; i < lista.length; i++) {
      if (Number(lista[i].vaga) === Number(numeroVaga)) { return lista[i]; }
    }
    return null;
  }

  // Salva uma nova reserva e devolve o registro criado
  function salvar(reserva) {
    var lista = ler();
    reserva.id = proximoId(lista);
    lista.push(reserva);
    gravar(lista);
    return reserva;
  }

  // Remove a reserva pelo id
  function remover(id) {
    var lista = ler();
    var restantes = [];
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].id !== Number(id)) { restantes.push(lista[i]); }
    }
    gravar(restantes);
    return lista.length !== restantes.length;
  }

  // Monta a situacao de todas as vagas do estacionamento
  function listarVagas() {
    var vagas = [];
    for (var n = 1; n <= TOTAL_VAGAS; n++) {
      var reserva = buscarPorVaga(n);
      vagas.push({ numero: n, ocupada: reserva !== null, reserva: reserva });
    }
    return vagas;
  }

  function listarDisponiveis() {
    return listarVagas().filter(function (v) { return !v.ocupada; });
  }

  return {
    TOTAL_VAGAS: TOTAL_VAGAS,
    listar: listar,
    salvar: salvar,
    remover: remover,
    buscarPorVaga: buscarPorVaga,
    listarVagas: listarVagas,
    listarDisponiveis: listarDisponiveis
  };
})();
