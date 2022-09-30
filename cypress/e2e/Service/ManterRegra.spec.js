/// <reference types="cypress" />

describe('Funcionalidade: Manter Regras', () => {

    var token;

    beforeEach(() => {
        cy.login().then((auth) => {
            token = auth;
        })
        
    });
    
    it('[GET] - Deve consultar uma regra com sucesso', () =>{
        var idRegra = 2550;
        cy.request({
            method: 'GET',
            url: 'Regras?idRegra=' + idRegra,
            headers: { 
                Authorization: token
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.not.empty
        })
    });

    it('[GET] - Deve consultar uma regra e não encontrar ela', () =>{
        var idRegra = 1112555;
        cy.request({
            method: 'GET',
            url: 'Regras?idRegra=' + idRegra,
            headers: { 
                Authorization: token
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.Regras).length(0)
        })
    });

    
    it('[POST] - Deve adicionar uma regra com sucesso', () =>{
        cy.fixture("regra").then((regra) => {
            cy.request({
                method: 'POST',
                url: 'Regras',
                body: regra,
                headers: {
                    Authorization: token
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.not.empty
            })
        })
    });

    it('[POST] - Não deve adicionar uma regra com sucesso', () =>{
        cy.fixture("regraInvalida").then((regra) => {
            cy.request({
                method: 'POST',
                url: 'Regras',
                body: regra,
                headers: {
                    Authorization: token
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.Valido).to.eq(false)
            })
        })
    });

    
})