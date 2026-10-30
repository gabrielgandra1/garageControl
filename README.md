# Controle de Estacionamento

Aplicacao front-end para controle de reserva de vagas de um condominio, feita apenas com HTML, CSS e JavaScript puro (sem frameworks).

## Telas

| Arquivo | Tela |
|---|---|
| `index.html` | Cadastro de reserva de vaga |
| `vagas.html` | Listagem das vagas cadastradas (com remocao) |
| `disponiveis.html` | Vagas disponiveis e mapa geral do estacionamento |

## Estrutura (padrao MVC)

```
css/style.css                        estilos de todas as telas
js/model/ReservaModel.js             dados e regras (listar, salvar, remover)
js/view/ReservaView.js               montagem do HTML das telas
js/controller/CadastroController.js  eventos da tela de cadastro
js/controller/ListaController.js     eventos da tela de listagem
js/controller/DisponiveisController.js  eventos da tela de disponiveis
```

- **Model**: guarda as reservas no `localStorage` e expoe `listar()`, `salvar()`, `remover()`, `listarVagas()` e `listarDisponiveis()`. Na primeira execucao carrega 5 reservas ficticias. O estacionamento tem 20 vagas.
- **View**: apenas renderiza (tabela, grade de vagas, resumo e select de vagas) e le o formulario.
- **Controller**: liga eventos da tela aos metodos do Model e View.

## Como executar

Abrir o arquivo `index.html` no navegador.

## Comportamento do cadastro

Ao clicar em **Salvar**, os dados do formulario sao exibidos no `console.log` e um pop-up confirma o cadastro realizado com sucesso. O select de vagas mostra somente as vagas livres.
