var request = require("supertest");
var assert = require("assert");
var nock = require("nock");
var fs = require('fs');
var config = require("../config");
var app = require("../app").app;
var Fii = require("../models/fii.js");

describe("HOME", function(){
    it("should return 200 and json {message:'Recupera informações sobre proventos dos fii'}", function(done){
        request(app)
            .get("/")
            .expect(200)
            .end(function(err, res){
                if( err ) return done(err);

                assert.equal(res.body.message, "Recupera informações sobre proventos dos fii");
                done();
            })
    });
});

describe("API", function(){
    before(function(){
        Fii.create({
            codigo: "BBFI11B",
            data_base: "31/07/2015",
            cotacao_base: "10,85",
            data_pagamento: "07/08/2015",
            valor_rendimento: "0,051",
            porcentagem_rendimento: "0,468",
            observacao: "Show"
        }, function(error, doc){});
    });

    after(function(){
        Fii.remove({codigo:"BBFI11B"}, function(){});
    });

    it("should return 200 for method /api", function(done){
        request(app)
            .get("/api")
            .expect(200, done)
    });

    it("should return 200 for method /api/BBFI11B", function(done){
        request(app)
            .get("/api/BBFI11B")
            .expect(200, done)
    });

    it("should return 404 for method /api/XXXX", function(done){
        request(app)
            .get("/api/XXXX")
            .expect(404)
            .end(function(err, res){
                if( err ) return done(err);

                assert.equal(res.body.message, "Fii not found");
                done();
            });
    });
});

describe("SCRAP", function(){
    before(function(){
        Fii.remove({}, function(){});
    });

    it("should return {message:'95 fii, foram copiados.'}.", function(done){
        nock(config.endpoint).get("/").once()
            .reply(200, function(uri, requestBody, cb){
                fs.readFile(__dirname.concat("/index.html") , cb);
            });
        request(app)
            .get("/api/scrap")
            .expect(200)
            .end(function(error, res){
                if( error ) return done(error);

                assert.equal(res.body.message, "94 fii, foram copiados.");
                done();
            });
    });

    it("fii service return 404, scrap service should return message and status 503.", function(done){
        nock(config.endpoint).get("/").once().reply(404, "Fora");
        request(app)
            .get("/api/scrap")
            .expect(503)
            .end(function(error, res){
                assert.equal(res.body.message, "Serviço indisponível.");
                done();
            });
    });

    it("case html broken, scrap service should return status 503", function(done){
        nock(config.endpoint).get("/").once()
            .reply(200, function(uri, requestBody, cb){
                fs.readFile(__dirname.concat("/error.html") , cb);
            });
        request(app)
            .get("/api/scrap")
            .expect(503)
            .end(function(error, res){
                assert.equal(res.body.message, "Serviço indisponível.");
                done();
            });
    })
});
