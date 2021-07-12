'use strict'

var Equipos = require('../modelos/equipos.modelo');

function ejemplo(req, res) {
    if (req.user.rol === "ROL_USUARIO") {
        res.status(200).send({ mensaje: `Hola mi nombre es: ${req.user.nombre}` })
    } else {
        res.status(400).send({ mensaje: 'Solo el rol de tipo usuario puede acceder' })
    }

}

function agregarEquipos(req, res){
    var EquiposModel = new Equipos();
    var params = req.body;
    
    if(params.nombre){
        EquiposModel.nombre = params.nombre;

       EquiposModel.save((err, equipoGuardado)=>{
            if(err) return res.status(500).send({mensakje: 'Error en la peticion del equipó'})
            if(!equipoGuardado) return res.status(500).send({mensaje: 'Error al agregar el equipo'})
        
            return res.status(200).send({equipoGuardado});
        })
    }
}

function obtenerEquipos(req,res){

    Equipos.find().exec((err, equipos)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion de obtener las ligas'})
        if(!equipos) return res.status(500).send({mensaje:'No existen ligas para mostrar'});
        
        return res.status(200).send({equipos});
    })
}

function obtenerEquiposID(req, res) {
    var equiposId = req.params.idEquipos;

    Equipos.findById(equiposId, (err, equipoEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Equipo' });
        if (!equipoEncontrado) return res.status(500).send({ mensaje: 'Error al obtener Los Equipos' });
        return res.status(200).send({ equipoEncontrado });
    })
}


function editarEquipos(req, res) {
    var idEquipos = req.params.id;
    var params = req.body;

    delete params.password;

    if (req.user.rol != "ROL_USUARIO") {
        return res.status(500).send({ mensaje: 'No posee los permisos para eliminar las ligas de otros usuarios' });
    }
    
    Usuario.findByIdAndUpdate(idEquipos, params, { new: true }, (err, equipoActualizado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!equipoActualizado) return res.status(500).send({ mensaje: 'No se a podido editar al Usuario' });

        return res.status(200).send({ equipoActualizado })
    })
  
}

function eliminarEquipos(req, res){
    var idEquipos = req.params.id
    /*var idUsuario = req.params.idUsuario;*/


    if (req.user.rol != "ROL_USUARIO") {
        return res.status(500).send({ mensaje: 'No posee los permisos para eliminar las ligas de otros usuarios' });
    }
    
  
    Ligas.findByIdAndDelete(idLigas, ((err, equipoEliminado)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!equipoEliminado) return res.status(500).send({ mensaje: 'No se a podido eliminar la liga' });

        return res.status(200).send({equipoEliminado})
    }))
    
}




module.exports = {
    agregarEquipos,
    obtenerEquipos,
    obtenerEquiposID,
    editarEquipos,
    eliminarEquipos,
    ejemplo,
}