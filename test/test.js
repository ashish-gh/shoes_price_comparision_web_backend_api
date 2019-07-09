var mocha = require('mocha')
var describe = mocha.describe
var expect = require('chai').expect
var assert = require('assert');

var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3800");

describe('shopAPI', () => {

  // Passed Test
  // to add destails of shop 
    it("should be able to add shop",function(done){
        server
        .post('/shop')
        .send({shopName : 'r', 'shopLocation' : 'a', shopDescription:'b'})
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          done();
        });
      });


  // to get al details of shop 
      it("should be able to get details of shop",function(done){
        server
        .get('/shop')
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          done();
        });
      });

      // to get al details of one shop i.e shopId = 1 
      it("should be able to get details of shop id 1",function(done){
        server
        .get('/shop/:shopId')
        .send( { shopId : 100 } )
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          done();
        });
      });


       // to delete shop details
       it("should be able to delete details of shop",function(done){
        server
        .delete('/shop/:shopId')
        .send( { shopId : 38 } )
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          done();
        });
      });
     


// Failed test
      // to add destails of shop 
    it("should be able to add shop",function(done){
      server
      .post('/shop')
      .send()
      .expect("Content-type",/json/)
      .expect(200)
      .end(function(err,res){
        res.status.should.equal(200);
        done();
      });
    });

});