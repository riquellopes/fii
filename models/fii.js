var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FiiSchema = new Schema({
    codigo: {type: String, index: true, required: true},
    data_base: String,
    cotacao_base: String,
    data_pagamento: String,
    valor_rendimento: String,
    porcentagem_rendimento: String,
    observacao: String,
    created: {
        type: Date,
        default: Date.now
    }
});

var fii = module.exports = mongoose.model('Fii', FiiSchema);

FiiSchema.pre("save", function(next){
    this.codigo = self.codigo.split("*")[0];
    next();
})
