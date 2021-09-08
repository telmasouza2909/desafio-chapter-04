class Assertions {

    shouldHaveStatus(response, status ){
        expect(response.status, `status is ${status}`).to.eq(status)
    }

    validateContractOf(response, schema){
        return cy.wrap(response.body).should(
            schema
         )
    }

    shouldbookingIdBePresent(response){
        return expect(response.body.bookingid, 'bookingid exists').to.not.be.null
    }

    shouldHaveDefaultHeaders(response){
        return expect(response.headers, 'default headers').to.include({
            server: 'Cowboy',            
            connection: 'keep-alive',
            'x-powered-by': 'Express'
        })
    }

    shouldHaveContentTypeAppJson(response){
        return expect(response.headers, 'content-type').to.include({
            'content-type': 'application/json; charset=utf-8'
        })
    }

    shouldHaveContentTypeTxtPlain(response){
        return expect(response.headers, 'content-type').to.include({
            'content-type': 'text/plain; charset=utf-8'
        })
    }

    shouldDurationBeFast(response){
        return expect(response.duration, 'duration').lessThan(900)
    }
    
}

export default new Assertions()