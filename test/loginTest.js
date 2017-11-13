'use strict';

const chai = require('chai');  
const expect = require('chai').expect;
 
chai.use(require('chai-http'));

const app = require('../server.js');

describe('login test', () => 
{
    var url = '/api/';

    var client = {
        name: 'Britney',
        password: 'Britney1234'
    };

    it('Should return json as default data format and 200 http code, return the token auth.', (done) => 
    {             
        chai.request(app)
                .post(url)
                .send(client)
                .end((err, res) =>
                {
                    expect(res).to.have.status(200);
                    expect(res.body.success).to.equal(true);
                    expect(res).to.be.json;
                    done();
                });         
    });

    it('Password wrong, code 401, Unauthorized.', (done) => 
    {             
        chai.request(app)
                .post(url)
                .send({name: 'Britney', password: 'Britney'})
                .end((err, res) =>
                {
                    expect(res).to.have.status(401);
                    expect(res.body.success).to.equal(false);
                    done();
                });         
    });

    it('Not name, error 422.', (done) => 
    {             
        chai.request(app)
                .post(url)
                .send({password: 'Britney'})
                .end((err, res) =>
                {
                    expect(res).to.have.status(422);
                    expect(res.body.success).to.equal(false);
                    done();
                });         
    });

    it('name false, error 404, User not found.', (done) => 
    {             
        chai.request(app)
                .post(url)
                .send({name: 'Brit', password: 'Britney'})
                .end((err, res) =>
                {
                    expect(res).to.have.status(404);
                    expect(res.body.success).to.equal(false);
                    done();
                });         
    });          
});