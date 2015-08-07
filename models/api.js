var Fii = require("./fii.js");
var scrap = require('scrap');
var util = require("util");
var config = require("../config");

var hide_fields = "-_id -created -__v -id";
exports.list = function(request, response){
    Fii.find({}, hide_fields, function(error, docs){
        response.json(docs);
    });
}

exports.filter = function(request, response){
    Fii.findOne({codigo:request.params.codigo}, hide_fields, function(error, docs){
        if( !error && docs ){
            response.json(docs);
        }else{
            response.status(404).json({"message": "Fii not found"});
        }
    });
}

exports.scrap = function(request, response){
    scrap(config.endpoint.concat("/"), function(err, $) {
          if( err ) return response.json(err);

          var datas = new Array();
          for(var i=1; i < $('tr','table').length; i++){
              var tr = $('tr','table').eq(i);
              var data = {
                  codigo: $("td", tr).eq(0).text(),
                  data_base: $("td", tr).eq(1).text(),
                  cotacao_base: $("td", tr).eq(2).text(),
                  data_pagamento: $("td", tr).eq(3).text(),
                  valor_rendimento: $("td", tr).eq(4).text(),
                  porcentagem_rendimento: $("td", tr).eq(5).text(),
                  observacao: $("td", tr).eq(6).text()
              }

              datas.push(data);
          }// for

          Fii.create(datas, function(error, doc){
              var message = util.format("%s fii, foram copiados.", i);
              if( error ){
                  message = "Erro ao importar as informações.";
              }

              response.json({"message": message});
          });
    });
}
