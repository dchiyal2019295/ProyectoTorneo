'use strict'

var moongose = require("mongoose");
var Schema = moongose.Schema;

var ligasSchema = Schema({
    nombre: String,
    autor: { type: Schema.Types.String, ref: 'usuarios' }
    }
);

module.exports = moongose.model("ligas", ligasSchema);


/*
        

*/