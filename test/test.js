const chai = require('chai') 
const chaiHttp = require('chai-http') 
chai.use(chaiHttp)
const {server} = require('../app')
const expect = chai.expect;
import {masterKey} from '../config'





describe('Admin Functionality', function() {
    describe('#get All habits', function() {
      it('should return an array of objects - habits', function() {
        chai.request(server)
            .get('/habits')
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res).to.be.an('array')
            })
      });
    });
    describe('#post one habit', function () {
        it('should create one habit, return the object created', function(){
            chai.request(server)
                .post('/habits?masterKey='+masterKey)
                .set('Content-Type', 'application/json')
                .send({
                    'name': 'Tarea de testing',
                    'influence': 'good',
                    'difficulty':'normal'
                })
                .end((err, res)=> {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res).to.be.an('object')
                })
        })
    })
  });