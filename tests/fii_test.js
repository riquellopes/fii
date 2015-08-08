var assert = require('assert');
var Fii = require("../models/fii.js");
var config = require("../config");

describe("Fii", function(){
    before(function(){
        Fii.remove({}, function(){});
    });

    it("should create fii ABCP11", function(done){
        Fii.create({
            codigo: "ABCP11",
            data_base: "31/07/2015",
            cotacao_base: "10,85",
            data_pagamento: "07/08/2015",
            valor_rendimento: "0,051",
            porcentagem_rendimento: "0,468",
            observacao: "Show"
        }, function(error, doc){
            if( error ) return done(error);

            assert.equal(doc.investidor_qualificado, false);
            assert.equal(doc.baixa_liquides, false);
            assert.equal(doc.codigo, "ABCP11");
            done();
        });
    });

    it("should create fii RBCB11*IQ**BL*", function(done){
        Fii.create({
            codigo: "RBCB11*IQ**BL*",
            data_base: "31/07/2015",
            cotacao_base: "10,85",
            data_pagamento: "07/08/2015",
            valor_rendimento: "0,051",
            porcentagem_rendimento: "0,468",
            observacao: "Show"
        }, function(error, doc){
            if( error ) return done(error);

            assert.equal(doc.investidor_qualificado, true);
            assert.equal(doc.baixa_liquides, true);
            assert.equal(doc.codigo, "RBCB11");
            done();
        });
    });

    it("should create fii CXRI11*BL*", function(done){
        Fii.create({
            codigo: "CXRI11*BL*",
            data_base: "31/07/2015",
            cotacao_base: "10,85",
            data_pagamento: "07/08/2015",
            valor_rendimento: "0,051",
            porcentagem_rendimento: "0,468",
            observacao: "Show"
        }, function(error, doc){
            if( error ) return done(error);

            assert.equal(doc.investidor_qualificado, false);
            assert.equal(doc.baixa_liquides, true);
            assert.equal(doc.codigo, "CXRI11");
            done();
        });
    });

    it("should create fii CPTS11B*IQ*", function(done){
        Fii.create({
            codigo: "CPTS11B*IQ*",
            data_base: "31/07/2015",
            cotacao_base: "10,85",
            data_pagamento: "07/08/2015",
            valor_rendimento: "0,051",
            porcentagem_rendimento: "0,468",
            observacao: "Show"
        }, function(error, doc){
            if( error ) return done(error);

            assert.equal(doc.investidor_qualificado, true);
            assert.equal(doc.baixa_liquides, false);
            assert.equal(doc.codigo, "CPTS11B");
            done();
        });
    });

    it("should get error to create fii CPTS11B*IQ*", function(){
        Fii.create({
            codigo: "CPTS11B*IQ*",
            data_base: "31/07/2015",
            cotacao_base: "10,85",
            data_pagamento: "07/08/2015",
            valor_rendimento: "0,051",
            porcentagem_rendimento: "0,468",
            observacao: "Show"
        }, function(error, doc){
            assert.equal(error.name, "MongoError");
            assert.equal(error.name, 'E11000 duplicate key error index: fii_test.fiis.$codigo_1 dup key: { : "CPTS11B" }');
            done();
        });
    })
});
