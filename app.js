'use strict'

//variables globales
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const cors = require('cors')

//importacion de rutas


// middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//cabezeras
app.use(cors());                         



//aplicacion de rutas



//exportar
module.exports = app;