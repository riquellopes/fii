//http://willi.am/blog/2014/07/28/test-your-api-with-supertest/
var Fii = require("./fii.js");
var scrap = require('scrap');
var util = require("util");
var config = require("../config");
var async = require("async")

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
        var message = "Serviço indisponível."
          if( err ){
              return response.status(503).json({message:message});
          }

          var queue = async.queue(function(object, callback){
              return object.save(callback);
          }, 4);

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

              queue.push(new Fii(data), function(error, doc){
                  if(error){
                      queue.kill();
                      return response.status(500).json(
                          {message:"Erro ao importar as informações."});
                  }
              });
          }// for

          if(queue.length() == 0){
              return response.status(503).json({message:message});
          }

          queue.drain = function(){
              response.json(
                  {message: util.format(
                      "%s fii, foram copiados.", (i-1))});
          };
    });
}
