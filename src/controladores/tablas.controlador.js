'use strict'

var tablas = require('../modelos/tablas.model');

/*function asignarpuntos(req, res){

    var params = req.body;
    var sumarId = req.params.Id;
    var puntos = Number(params.puntos);

    suma.findByIdAndUpdate(sumarId, {$inc:{marcador: puntos}}, {new: true}, (err, sumaEditadas)=>{
        return res.status(200).send({ sumaEditadas: sumaEditadas})
    })

}

module.exports={
    asignarpuntos
}*/

function obtenerTablas(req, res){
    var params = req.body

    usuario.findOne({ nombre: params.nombre }).exec((err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
        if (!usuarioEncontrado) return res.status(500).send({ mensaje: 'No existe ningun usuario en la base de datos' });
        if (usuarioEncontrado) return res.status(200).send({ usuarioEncontrado })
    })

}

module.exports={
    obtenerTablas
}