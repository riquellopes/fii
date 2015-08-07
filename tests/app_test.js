var request = require("supertest")
var assert = require("assert")
var app = require("../app").app
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
