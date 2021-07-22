describe('Home page', () => {
  beforeEach(() => {
    cy.fixture('home.json').as('home');
    cy.fixture('site.json').as('site');
  });

  it('Has latest', () => {
    cy.get('@site').then((site) => {
      const latest = site.latest.find((item) => item.active);

      if (latest) {
        cy.visit('/');
        cy.get('.latest__headline h2')
          .contains(latest.headline);
      }
    });
  });

  it('Has banner', () => {
    cy.get('@site').then((site) => {
      if (site.banner && site.banner.active) {
        cy.visit('/');
        cy.get('.banner')
          .contains(site.banner.text)
          .should('have.attr', 'href', site.banner.link);
      }
    });
  });
});
