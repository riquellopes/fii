require('dotenv').config({silent: true});
require('dotenv').load();

module.exports = require(
    "./".concat(process.env.NODE_ENV || "developement").concat(".json")
);
