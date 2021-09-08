/// <reference types="cypress" />

import req from '../support/api/request'
import schemas from '../support/api/schemas'
import assertions from '../support/api/assertions'

context('Booking', () => {

    before(() => {
        req.doAuth()
    })

    it('Validar o contrato do GET Booking @contract', () => {
        req.getBooking()
            .then(getBookingResponse => {
                assertions
                    .validateContractOf(
                        getBookingResponse, 
                        schemas.getBookingSchema()
                    )
            })
    });

    it('Criar uma reserva com sucesso @functional', () => {
        req.postBooking()
            .then(postBookingResponse => {
                assertions.shouldHaveStatus(postBookingResponse, 200)
                assertions.shouldbookingIdBePresent(postBookingResponse)
                assertions.shouldHaveDefaultHeaders(postBookingResponse)
                assertions.shouldHaveContentTypeAppJson(postBookingResponse)
                assertions.shouldDurationBeFast(postBookingResponse)
        })
    });

    it('Tentar alterar uma reserva sem token @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBookingWithoutToken(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 403)
                assertions.shouldHaveDefaultHeaders(putBookingResponse)
                assertions.shouldHaveContentTypeTxtPlain(putBookingResponse)
                assertions.shouldDurationBeFast(putBookingResponse)
            })
        })
    })

    it('Tentar alterar uma reserva inexistente @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBookingDoesNotExist(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 405)
                assertions.shouldHaveDefaultHeaders(putBookingResponse)
                assertions.shouldHaveContentTypeTxtPlain(putBookingResponse)
                assertions.shouldDurationBeFast(putBookingResponse)
            })
        })
    });

    it('Tentar alterar uma reserva com token invalido @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBookingWithInvalidToken(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 403)
                assertions.shouldHaveDefaultHeaders(putBookingResponse)
                assertions.shouldHaveContentTypeTxtPlain(putBookingResponse)
                assertions.shouldDurationBeFast(putBookingResponse)
            })
        })
    });

    it('Alterar uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBooking(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 200)
                assertions.shouldHaveDefaultHeaders(putBookingResponse)
                assertions.shouldHaveContentTypeAppJson(putBookingResponse)
                assertions.shouldDurationBeFast(putBookingResponse)
            })
        })
    });

    it('Tentar excluir uma reserva inexistente @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBookingDoesNotExist(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 405)
                assertions.shouldHaveDefaultHeaders(deleteBookingResponse)
                assertions.shouldHaveContentTypeTxtPlain(deleteBookingResponse)
                assertions.shouldDurationBeFast(deleteBookingResponse)
            })
        })
    })

    it('Tentar excluir uma reserva sem token @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBookingWithoutToken(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 403)
                assertions.shouldHaveDefaultHeaders(deleteBookingResponse)
                assertions.shouldHaveContentTypeTxtPlain(deleteBookingResponse)
                assertions.shouldDurationBeFast(deleteBookingResponse)
            })
        })
    })

    it('Tentar excluir uma reserva com token inválido @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBookingWithInvalidToken(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 403)
                assertions.shouldHaveDefaultHeaders(deleteBookingResponse)
                assertions.shouldHaveContentTypeTxtPlain(deleteBookingResponse)
                assertions.shouldDurationBeFast(deleteBookingResponse)
            })
        })
    });

    it('Excluir uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBooking(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 201)
                assertions.shouldHaveDefaultHeaders(deleteBookingResponse)
                assertions.shouldHaveContentTypeTxtPlain(deleteBookingResponse)
                assertions.shouldDurationBeFast(deleteBookingResponse)
            })
        })
    });
    

});