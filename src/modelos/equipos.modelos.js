'use strict'

var moongose = require("mongoose");
var Schema = moongose.Schema;

var equiposSchema = Schema({
 
    logo: String,
    nombre: String,
    
    marcador:[{
        goles:Number
    }]



});

module.exports = moongose.model("equipos", equiposSchema);
