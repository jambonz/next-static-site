describe('Footer', () => {
  beforeEach(() => {
    cy.fixture('site.json').as('site');
  });

  it('Has support email', () => {
    cy.get('@site').then((site) => {
      cy.visit('../../out/index.html');
      cy.get('.foot__support .btn')
        .contains(site.footer.email);
    });
  });

  it('Has page links', () => {
    cy.get('@site').then((site) => {
      cy.visit('../../out/index.html');

      site.navi.links.forEach((item, i) => {
        cy.get(`.foot__links:last-child li:nth-child(${i + 2}) .foot__link`)
          .contains(item.label)
          .should('have.attr', 'href', item.link);
      });
    });
  });

  it('Has resource links', () => {
    cy.get('@site').then((site) => {
      cy.visit('../../out/index.html');

      site.footer.links.forEach((item, i) => {
        cy.get(`.foot__links:first-child li:nth-child(${i + 1}) .foot__link`)
          .contains(item.label)
          .should('have.attr', 'href', item.link);
      });
    });
  });
});
