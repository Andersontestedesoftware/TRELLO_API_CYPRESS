const trelloKey = Cypress.env('trelloKey');
const trelloToken = Cypress.env('trelloToken');
let boardId;
let listaTarefaAFazerId;
let idCartao;
const trelloApiUrl = 'https://api.trello.com/1';
let nome = 'Entrevista 2024';

describe('Automação de API Trello', () => {
  // Criar o board antes de todos os testes.
  before(() => {
    cy.api({
      method: 'POST',
      url: `${trelloApiUrl}/boards/?name=${nome}&key=${trelloKey}&token=${trelloToken}`,
      headers: {
        'Accept': 'application/json'
      },
      body: {
        "defaultLists": false
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      boardId = response.body.id;
    });
  });

  it('Criado o Board antes', () => {
    /*
    Before prepara o ambiente enquanto 
    it contém a lógica do fluxo de execução.
    Logo, eu não consigo colocar um it dentro
    do Before iria quebrar a lógica do fluxo
    do framework de testes, então coloquei no 
    final para sinalizar que criou um board.    
    */
  });

  it('Criar lista "Tarefas Concluidas"', () => {
    criarLista('Tarefas Concluidas');
  });

  it('Criar lista "Fazendo as Tarefas"', () => {
    criarLista('Fazendo as Tarefas');
  });

  it('Criar lista "Tarefas a Fazer"', () => {
    cy.api({
      method: 'POST',
      url: `${trelloApiUrl}/lists?name=Tarefas a Fazer&idBoard=${boardId}&key=${trelloKey}&token=${trelloToken}`,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      listaTarefaAFazerId = response.body.id;
    });
  });

  it('Criar um cartao "God of War" na lista "Tarefas a Fazer"', () => {
    cy.api({
      method: 'POST',
      url: `${trelloApiUrl}/cards?idList=${listaTarefaAFazerId}&key=${trelloKey}&token=${trelloToken}`,
      headers: {
        'Accept': 'application/json'
      },
      body: {
        "name": "God of War"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      idCartao = response.body.id;
    });
  });

  it('Atualizar o nome do cartao para "Jujutsu Kaisen"', () => {
    cy.api({
      method: 'PUT',
      url: `${trelloApiUrl}/cards/${idCartao}?key=${trelloKey}&token=${trelloToken}`,
      headers: {
        'Accept': 'application/json'
      },
      body: {
        "name": "Jujutsu Kaisen"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Deletar o cartao "Jujutsu Kaisen"', () => {
    cy.api({
      method: 'DELETE',
      url: `${trelloApiUrl}/cards/${idCartao}?key=${trelloKey}&token=${trelloToken}`,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  // Deletar o board após todos os testes
  after(() => {
    cy.api({
      method: 'DELETE',
      url: `${trelloApiUrl}/boards/${boardId}?key=${trelloKey}&token=${trelloToken}`,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  // Função para criar listas
  function criarLista(nomeLista) {
    cy.api({
      method: 'POST',
      url: `${trelloApiUrl}/lists?name=${nomeLista}&idBoard=${boardId}&key=${trelloKey}&token=${trelloToken}`,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  }

});
