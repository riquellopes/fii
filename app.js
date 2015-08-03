var express = require("express");
var config = require("./config");
var mongoose = require('mongoose');
var api = require("./models/api.js");

var app = exports.app = express();

mongoose.connect(config.uri);

var port = process.env.PORT || 5000;
router = express.Router()

router.route("/").get(api.list);
router.route("/:codigo").get(api.filter);
app.set('json spaces', 2);
app.use("/api", router);

app.get("/", function(request, response){
    response.json({message:"Recupera informações sobre proventos dos fii"});
});

app.listen(port);
