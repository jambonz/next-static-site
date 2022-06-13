describe('Navigation', () => {

  beforeEach(() => {
    cy.fixture('site.json').as('site');
  });

  it('Has jambonz logo', () => {
    cy.get('@site').then((site) => {
      cy.visit('/');
      cy.get('.navi__logo')
        .should('have.attr', 'href', site.navi.home.link);
    });
  });

  it('Has page links', () => {
    cy.get('@site').then((site) => {
      cy.visit('/');

      site.navi.links.forEach((item, i) => {
        cy.get(`.navi__links li:nth-child(${i + 1}) .navi__link`)
          .contains(item.label)
          .should('have.attr', 'href', item.link);
      });
    });
  });

  it('Has login button', () => {
    cy.get('@site').then((site) => {
      cy.visit('/');

      cy.get('.navi__login .btn')
        .contains(site.navi.login.label)
        .should('have.attr', 'href', 
          `${site.navi.login.link.pathname}?redirect=${site.navi.login.link.query.redirect}`
        )
    });
  });

  it('Has no mobile navi above max-width', () => {
    cy.visit('/');
    cy.viewport('macbook-15');

    cy.get('.navi__mobile')
      .should('have.length', 0);

    cy.get('.navi__links')
      .should('be.visible');
    
    cy.get('.navi__logo')
      .should('be.visible');

    cy.get('.navi__icon')
      .should('not.be.visible');
  });

  it('Has mobile navi below max-width', () => {
    cy.visit('/');
    cy.viewport('ipad-2');

    cy.get('.navi')
      .should('have.class', 'mobile');
    
    cy.get('.navi__links')
      .should('not.be.visible');

    cy.get('.navi__mobile')
      .should('have.length', 1);
    
    cy.get('.navi__icon')
      .should('be.visible')
      .click();
    
    cy.get('.navi')
      .should('have.class', 'active');

    cy.get('.navi__mobile')
      .should('have.class', 'active');
    
    cy.get('.navi__mobile__icon')
      .click();
    
    cy.get('.navi')
      .should('not.have.class', 'active');

    cy.get('.navi__mobile')
      .should('not.have.class', 'active');
  });
});
