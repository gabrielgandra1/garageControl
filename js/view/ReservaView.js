// View - responsavel apenas por montar o HTML das telas
var ReservaView = (function () {

  function preencherSelectVagas(select, vagas) {
    select.innerHTML = '<option value="">Selecione a vaga</option>';
    for (var i = 0; i < vagas.length; i++) {
      var opcao = document.createElement('option');
      opcao.value = vagas[i].numero;
      opcao.textContent = 'Vaga ' + vagas[i].numero;
      select.appendChild(opcao);
    }
  }

  function renderizarLista(tbody, reservas, aoRemover) {
    tbody.innerHTML = '';

    if (reservas.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8" class="vazio">Nenhuma vaga cadastrada.</td></tr>';
      return;
    }

    reservas.forEach(function (r) {
      var linha = document.createElement('tr');
      linha.innerHTML =
        '<td>' + r.vaga + '</td>' +
        '<td>' + r.placa + '</td>' +
        '<td>' + r.proprietario + '</td>' +
        '<td>' + r.apartamento + '</td>' +
        '<td>' + r.bloco + '</td>' +
        '<td>' + r.modelo + '</td>' +
        '<td>' + r.cor + '</td>';

      var celulaAcao = document.createElement('td');
      var botao = document.createElement('button');
      botao.className = 'btn-remover';
      botao.textContent = 'Remover';
      botao.addEventListener('click', function () { aoRemover(r); });
      celulaAcao.appendChild(botao);
      linha.appendChild(celulaAcao);

      tbody.appendChild(linha);
    });
  }

  function renderizarResumo(container, vagas) {
    var ocupadas = vagas.filter(function (v) { return v.ocupada; }).length;
    container.innerHTML =
      '<div><span>' + vagas.length + '</span><small>Total de vagas</small></div>' +
      '<div><span>' + ocupadas + '</span><small>Ocupadas</small></div>' +
      '<div><span>' + (vagas.length - ocupadas) + '</span><small>Disponiveis</small></div>';
  }

  function renderizarGrade(container, vagas) {
    container.innerHTML = '';

    if (vagas.length === 0) {
      container.innerHTML = '<p class="vazio">Nenhuma vaga disponivel.</p>';
      return;
    }

    vagas.forEach(function (v) {
      var item = document.createElement('div');
      item.className = 'vaga ' + (v.ocupada ? 'ocupada' : 'livre');
      item.innerHTML = 'Vaga ' + v.numero +
        '<small>' + (v.ocupada ? v.reserva.placa : 'Livre') + '</small>';
      container.appendChild(item);
    });
  }

  function lerFormulario(form) {
    return {
      placa: form.placa.value.trim().toUpperCase(),
      proprietario: form.proprietario.value.trim(),
      apartamento: form.apartamento.value.trim(),
      bloco: form.bloco.value.trim().toUpperCase(),
      modelo: form.modelo.value.trim(),
      cor: form.cor.value.trim(),
      vaga: Number(form.vaga.value)
    };
  }

  return {
    preencherSelectVagas: preencherSelectVagas,
    renderizarLista: renderizarLista,
    renderizarResumo: renderizarResumo,
    renderizarGrade: renderizarGrade,
    lerFormulario: lerFormulario
  };
})();
