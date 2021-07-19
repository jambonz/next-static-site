describe('Home page', () => {
  beforeEach(() => {
    cy.fixture('home.json').as('home');
    cy.fixture('site.json').as('site');
  });

  it('Has latest', () => {
    cy.get('@home').then((home) => {
      const latest = home.latest.find((item) => item.active);

      if (latest) {
        cy.visit('../../out/index.html');
        cy.get('.latest__headline h2')
          .contains(latest.headline);
      }
    });
  });

  it('Has banner', () => {
    cy.get('@site').then((site) => {
      if (site.banner && site.banner.active) {
        cy.visit('../../out/index.html');
        cy.get('.banner')
          .contains(site.banner.text)
          .should('have.attr', 'href', site.banner.link);
      }
    });
  });
});
