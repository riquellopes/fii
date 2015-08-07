var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FiiSchema = new Schema({
    codigo: {type: String, index: true, required: true, unique:true},
    data_base: String,
    cotacao_base: String,
    data_pagamento: String,
    valor_rendimento: String,
    porcentagem_rendimento: String,
    baixa_liquides: Boolean,
    investidor_qualificado: Boolean,
    observacao: String,
    created: {
        type: Date,
        default: Date.now
    }
});

var fii = module.exports = mongoose.model('Fii', FiiSchema);

FiiSchema.pre("save", function(next){
    this.investidor_qualificado = (this.codigo.indexOf("*IQ*") > -1);
    this.baixa_liquides = (this.codigo.indexOf("*BL*") > -1);
    this.codigo = this.codigo.split("*")[0];
    next();
})
