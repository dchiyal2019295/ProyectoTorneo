'use strict'

var moongose = require("mongoose");
var Schema = moongose.Schema;

var ligasSchema = Schema({
 nombre: String,
 descripcion: String,
 equipos: {type: Schema.Types.ObjectId, ref: 'equipos'}
});

module.exports = moongose.model("ligas", ligasSchema);
