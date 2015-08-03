var Fii = require("./fii.js");

exports.list = function(request, response){
    Fii.find(function(error, docs){
        response.json(docs);
    });
}

exports.filter = function(request, response){
    Fii.findOne({codigo:request.params.codigo}, function(error, docs){
        response.json(docs);
    })
}
