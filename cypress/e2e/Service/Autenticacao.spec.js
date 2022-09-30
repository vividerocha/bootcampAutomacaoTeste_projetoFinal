/// <reference types="cypress" />

import auth from '../../fixtures/auth.json'
import usuarios from '../../fixtures/usuarios.json'

var apiSeguranca = 'http://api-seguranca.dev-tesla-b2b.net/';

it('[POST] - Teste de autenticação usuário válido', () => {
    cy.request({
        method: 'POST',
        url: apiSeguranca + 'ControleAcesso/WebTokens/Autenticacao/AutenticarAdministrador',
        body: auth
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.not.empty
            //console.log(response.body.Token)
            expect(response.body).to.have.property("Token")
            cy.getCookies('conexaoqa.herokuapp.com').should('exist')
            //console.log(response.body)
            //cy.log(response.body)
        })
});

it('[POST] - Teste de autenticação com usuário inválido', () => {

    cy.request({
        method: 'POST',
        url: apiSeguranca + 'ControleAcesso/WebTokens/Autenticacao/AutenticarAdministrador',
        failOnStatusCode: false,
        body: usuarios
    }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.Token).eq(null)
    })
});
