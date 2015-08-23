if( process.env.URI == undefined ){
    require('dotenv').config({silent: true, path: process.env.NODE_ENV || ".env" });
    require('dotenv').load();
}

module.exports = {
    "uri": process.env.URI,
    "endpoint": process.env.ENDPOINT
}
