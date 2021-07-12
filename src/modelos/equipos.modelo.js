'use strict'

var moongose = require("mongoose");
var Schema = moongose.Schema;

var equiposSchema = Schema({
    nombre: String,
});

module.exports = moongose.model("equipos", equiposSchema);