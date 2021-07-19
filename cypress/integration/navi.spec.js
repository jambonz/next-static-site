describe('Navigation', () => {

  beforeEach(() => {
    cy.fixture('site.json').as('site');
  });

  it('Has jambonz logo', () => {
    cy.get('@site').then((site) => {
      cy.visit('../../out/index.html');
      cy.get('.navi__logo')
        .should('have.attr', 'href', site.navi.home.link);
    });
  });

  it('Has page links', () => {
    cy.get('@site').then((site) => {
      cy.visit('../../out/index.html');

      site.navi.links.forEach((item, i) => {
        cy.get(`.navi__links li:nth-child(${i + 1}) .navi__link`)
          .contains(item.label)
          .should('have.attr', 'href', item.link);
      });
    });
  });

  it('Has login button', () => {
    cy.get('@site').then((site) => {
      cy.visit('../../out/index.html');

      cy.get('.navi__login .btn')
        .contains(site.navi.login.label)
        .should('have.attr', 'href', site.navi.login.link)
        .should('have.attr', 'target', '_blank');
    });
  });
});
