import { ticket } from '../ticket.stub';

describe('Ticket View', () => {
  const searchId = '123';
  const numberOfTickets = 3;

  beforeEach(() => {
    cy.intercept('GET', '/search', {
      body: {
        searchId,
      },
    });
  });

  it(`should render ${numberOfTickets} tickets`, () => {
    cy.intercept('GET', `/tickets?searchId=${searchId}`, {
      body: {
        tickets: Array(numberOfTickets).fill(ticket),
        stop: true,
      },
    });
    cy.visit('/');

    cy.get('.ticket-list-item').should('have.length', numberOfTickets);
  });

  it('should show the tip if no filters selected', () => {
    cy.intercept('GET', `/tickets?searchId=${searchId}`, {
      body: {
        tickets: Array(numberOfTickets).fill(ticket),
        stop: true,
      },
    });
    cy.visit('/');

    cy.contains('Все').click();

    cy.contains('Даша поможет тебе выбрать фильтры').should('be.visible');
  });

  it('should render the button after ticket list if there are tickets to show', () => {
    cy.intercept('GET', `/tickets?searchId=${searchId}`, {
      body: {
        tickets: Array(6).fill(ticket),
        stop: true,
      },
    });
    cy.visit('/');

    cy.contains('Показать еще 1 билет!').should('be.visible');
  });

  it('should render the error if there is error while fetching tickets', () => {
    cy.intercept('GET', `/tickets?searchId=${searchId}`, {
      statusCode: 500,
    });
    cy.visit('/');

    cy.contains('Хьюстон, кажется, у нас проблема...');
    cy.contains('№ 500');
  });
});
