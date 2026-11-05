// Controller da tela de cadastro de reserva
(function () {
  var form = document.getElementById('form-reserva');
  var selectVaga = document.getElementById('vaga');

  function carregarVagasLivres() {
    ReservaView.preencherSelectVagas(selectVaga, ReservaModel.listarDisponiveis());
  }

  function salvar(evento) {
    evento.preventDefault();

    var reserva = ReservaView.lerFormulario(form);

    if (ReservaModel.buscarPorVaga(reserva.vaga) !== null) {
      alert('Esta vaga ja esta ocupada. Escolha outra.');
      carregarVagasLivres();
      return;
    }

    var salva = ReservaModel.salvar(reserva);
    console.log('Reserva cadastrada:', salva);
    alert('Cadastro realizado com sucesso!');

    form.reset();
    carregarVagasLivres();
  }

  form.addEventListener('submit', salvar);
  form.addEventListener('reset', function () {
    setTimeout(carregarVagasLivres, 0);
  });

  carregarVagasLivres();
})();
