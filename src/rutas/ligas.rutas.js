'use strict'

var express = require("express");
var ligaControlador = require("../controladores/ligas.controlador");

var md_autorization = require("../middlewares/authenticated");

var api = express.Router();
api.post('/agregarLigas', md_autorization.ensureAuth, ligaControlador.agregarLigas);
api.get('/visualizarLigas', md_autorization.ensureAuth, ligaControlador.obtenerLigas);
api.get('/obtenerLigasId/:idLigas', md_autorization.ensureAuth, ligaControlador.obtenerLigasID);
api.put('/editarLigas/:id', md_autorization.ensureAuth, ligaControlador.editarLigas);
api.delete('/eliminarLigas/:id', md_autorization.ensureAuth, ligaControlador.eliminarLigas);



module.exports = api;