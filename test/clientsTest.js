'use strict';

const chai = require('chai');  
const expect = require('chai').expect;
 
chai.use(require('chai-http'));

const app = require('../server.js');

var tokenFailed = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJy2xlIjoiYWRtaW4iLCJpYXQiOjE1MTAyMTk4NzF9.6BAOJIxMTAPalIRxyO89h8EykTR4ihv7Nrku6lGsrxk';
var tokenOk = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MTAyMTk4NzF9.6BAOJIxMTAPalIRxyO89h8EykTR4ihv7Nrku6lGsrxk';

describe('clients name test', () => 
{
    var url = '/api/clients/name/';
    var name = 'Britney';

    it('Should return json as default data format and 403 http code, Not token provide.', (done) => 
    {             
        chai.request(app)
                .get(url+name)
                .end((err, res) =>
                {
                    expect(res).to.have.status(403);
                    expect(res.body.success).to.equal(false);
                    expect(res).to.be.json;
                    done();
                });         
    });

    it('Return error 404, Client not found.', (done) => 
    {             
        chai.request(app)
                .get('/api/clients/name/Carlos')
                .set('Authorization', tokenOk)
                .end((err, res) =>
                {
                    expect(res).to.have.status(404);
                    expect(res.body.success).to.equal(false);
                    done();
                });         
    });    

    it('Failed to authenticate token, error 422.', (done) => 
    {             
        chai.request(app)
                .get(url+name)
                .set('Authorization', tokenFailed)
                .end((err, res) =>
                {
                    expect(res).to.have.status(422);
                    expect(res.body.success).to.equal(false);
                    done();
                });         
    });

    it('return the client and http code is 200.', (done) => 
    {             
        chai.request(app)
                .get(url+name)
                .set('Authorization', tokenOk)
                .end((err, res) =>
                {
                    expect(res).to.have.status(200);
                    expect(res.body.success).to.equal(true);
                    done();
                });         
    });       
});

describe('clients id test', () => 
{
    var idOk = 'a0ece5db-cd14-4f21-812f-966633e7be86';
    var idFalse = 'a0ece5db-cd14-4f21-812f-96663';    
    var url = '/api/clients/';

    it('Should return json as default data format and 403 http code, Not token provide.', (done) => 
    {             
        chai.request(app)
                .get(url+idOk)
                .end((err, res) =>
                {
                    expect(res).to.have.status(403);
                    expect(res.body.success).to.equal(false);
                    expect(res).to.be.json;
                    done();
                });         
    });

    it('Return 404 error, client not found.', (done) => 
    {             
        chai.request(app)
                .get(url+idFalse)
                .set('Authorization', tokenOk)
                .end((err, res) =>
                {
                    expect(res).to.have.status(404);
                    expect(res.body.success).to.equal(false);
                    done();
                });         
    });

    it('Failed to authenticate token, error 422.', (done) => 
    {             
        chai.request(app)
                .get(url+idOk)
                .set('Authorization', tokenFailed)
                .end((err, res) =>
                {
                    expect(res).to.have.status(422);
                    expect(res.body.success).to.equal(false);
                    done();
                });         
    });

    it('return the client and http code is 200.', (done) => 
    {             
        chai.request(app)
                .get(url+idOk)
                .set('Authorization', tokenOk)
                .end((err, res) =>
                {
                    expect(res).to.have.status(200);
                    expect(res.body.success).to.equal(true);
                    done();
                });         
    });       
});