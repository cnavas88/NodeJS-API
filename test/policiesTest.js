'use strict';

const chai = require('chai');  
const expect = require('chai').expect;
 
chai.use(require('chai-http'));

const app = require('../server.js');

var tokenFailed = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJy2xlIjoiYWRtaW4iLCJpYXQiOjE1MTAyMTk4NzF9.6BAOJIxMTAPalIRxyO89h8EykTR4ihv7Nrku6lGsrxk';
var tokenOk = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MTAyMTk4NzF9.6BAOJIxMTAPalIRxyO89h8EykTR4ihv7Nrku6lGsrxk';

describe('get the policies according user.', () =>
{
    it('Should return json as default data format and 200 http code, return policies according user.', (done) => 
    {             
        chai.request(app)
                .get('/api/clients/Manning/policies')
                .set('Authorization', tokenOk)
                .end((err, res) =>
                {
                    expect(res).to.have.status(200);
                    expect(res.body.success).to.equal(true);
                    expect(res).to.be.json;
                    done();
                });         
    });

    it('error in client name, error 404, User not found.', (done) => 
    {             
        chai.request(app)
                .get('/api/clients/Mannng/policies')
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
                .get('/api/clients/Manning/policies')
                .set('Authorization', tokenFailed)
                .end((err, res) =>
                {
                    expect(res).to.have.status(422);
                    expect(res.body.success).to.equal(false);
                    done();
                });         
    }); 

    it('Token not provider, error 403.', (done) => 
    {             
        chai.request(app)
                .get('/api/clients/Manning/policies')
                .end((err, res) =>
                {
                    expect(res).to.have.status(403);
                    expect(res.body.success).to.equal(false);
                    done();
                });         
    });

    it('The user login is not admin, not authorization.', (done) => 
    {             
        chai.request(app)
                .get('/api/clients/Manning/policies')
                .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsImlhdCI6MTUxMDU5Njc4MH0.e-Sg10ZjXIcnarFQtuwDuNYU1fjVYWuRmDqCedpo9YA')
                .end((err, res) =>
                {
                    expect(res).to.have.status(401);
                    expect(res.body.success).to.equal(false);
                    done();
                });         
    });                 
});