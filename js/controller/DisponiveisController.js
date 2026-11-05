// Controller da tela de vagas disponiveis
(function () {
  var vagas = ReservaModel.listarVagas();
  ReservaView.renderizarResumo(document.getElementById('resumo'), vagas);
  ReservaView.renderizarGrade(document.getElementById('grade-livres'), ReservaModel.listarDisponiveis());
  ReservaView.renderizarGrade(document.getElementById('grade-todas'), vagas);
})();
