describe('Test', () => {
    it('Karanlık mod butonu çalışıyor mu?', () => {
        cy.visit('http://localhost:3000/movies');
        cy.get('[data-cy=dark-mode]').click();
    })

    it('Dil değiştirme butonu çalışıyor mu?', () => {
        cy.visit('http://localhost:3000/movies/add');
        cy.get('[data-cy=lang-mode]').click();
    })

    it("Form alanı çalışıyor mu?", () => {
        cy.visit('http://localhost:3000/movies/add');
        cy.get('[data-cy="film-name"]')
            .type(`Üç Maymun`)
        cy.get('[data-cy="director-name"]')
            .type(`Nuri Bilge Ceylan`)
        cy.get('[data-cy="genre"]')
            .type(`Drama`)
        cy.get('[data-cy="metascore"]')
            .type(83)
        cy.get('[data-cy=add-button]').click();
        cy.visit('http://localhost:3000/movies/9');
        cy.get('[data-cy="delete-button"]').click();
    });
})
