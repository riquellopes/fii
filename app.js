var express = require("express");
var config = require("./config");
var mongoose = require('mongoose');
var api = require("./models/api.js");

var app = exports.app = express();
var port = process.env.PORT || 5000;
router = express.Router()

router.route("/").get(api.list);
router.route("/scrap").get(api.scrap);
router.route("/:codigo").get(api.filter);
app.set('json spaces', 2);
app.use("/api", router);

app.get("/", function(request, response){
    response.json({
             about:"Recupera informações sobre proventos dos fii",
             contact: "http://www.henriquelopes.com.br",
             project: "https://github.com/riquellopes/fii",
             search: {
                 exampleONE: "curl -X GET http://fii.henriquelopes.com.br/api/",
                 exampleTWO: "curl -X GET http://fii.henriquelopes.com.br/api/CNES11B"
             }
    });
});

app.listen(port);
