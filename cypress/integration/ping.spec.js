/// <reference types="cypress" />

import req from '../support/api/request'
import assertions from '../support/api/assertions'

context('Ping', () => {
    it('Validar que a aplicacao esta no ar @healthcheckn', () => {

        req.getPing().then(getPingResponse => {
            assertions.shouldHaveStatus(getPingResponse, 201)
        })  
        
        
    });
});