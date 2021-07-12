'use strict'

const { Router } = require("express");
var express = require("express");
var usuarioController = require("../controladores/tablas.controlador");


//MIDDLEWARES

var md_aurotization = require("../middlewares/authenticated")

var api = express.Router();
api.get('obtenerTabla', );


module.exports = api;
