var config = require("../config");
var nock = require("nock");
var fs = require('fs');
var scrap = require('scrap');

nock(config.endpoint)
    .get("/")
    .reply(200, function(uri, requestBody, cb){
        fs.readFile(__dirname.concat("/index.html") , cb);
    });

describe("Scrap", function(){

    it("title", function(done){
        done();
    })
});
