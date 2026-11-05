// Controller da tela de listagem das vagas cadastradas
(function () {
  var tbody = document.getElementById('corpo-tabela');

  function remover(reserva) {
    if (!confirm('Remover a reserva da vaga ' + reserva.vaga + ' (' + reserva.placa + ')?')) { return; }
    ReservaModel.remover(reserva.id);
    console.log('Reserva removida:', reserva);
    listar();
  }

  function listar() {
    ReservaView.renderizarLista(tbody, ReservaModel.listar(), remover);
  }

  listar();
})();
