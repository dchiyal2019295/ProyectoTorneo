'use strict'

var express = require("express");
var equipoControlador = require("../controladores/equipos.controladores");

var md_autorization = require("../middlewares/authenticated");

var api = express.Router();
api.post('/agregarEquipos', md_autorization.ensureAuth,equipoControlador.agregarEquipos);
api.get('/obtenerEquipos', md_autorization.ensureAuth, equipoControlador.obtenerEquipos);
api.get('/obtenerEquiposID/:equiposId', md_autorization.ensureAuth, equipoControlador.obtenerEquiposID);
api.put('/editarEquipos/:id', md_autorization.ensureAuth, equipoControlador.editarEquipos);
api.delete('/eliminarEquipos/:id', md_autorization.ensureAuth, equipoControlador.eliminarEquipos);



module.exports = api;