'use strict'

var Ligas = require('../modelos/ligas.modelos');

function ejemplo(req, res) {
    if (req.user.rol === "ROL_USUARIO") {
        res.status(200).send({ mensaje: `Hola mi nombre es: ${req.user.nombre}` })
    } else {
        res.status(400).send({ mensaje: 'Solo el rol de tipo usuario puede acceder' })
    }

}

function agregarLigas(req, res){
    var ligasModel = new Ligas();
    var params = req.body;
    
    if(params.nombre){
        ligasModel.nombre = params.nombre;
        ligasModel.autor = req.user.nombre;

        ligasModel.save((err, ligaGuardada)=>{
            if(err) return res.status(500).send({mensakje: 'Error en la peticion de la Liga'})
            if(!ligaGuardada) return res.status(500).send({mensaje: 'Error al agregar la liga'})
        
            return res.status(200).send({ligaGuardada});
        })
    }
}

function obtenerLigas(req,res){

    Ligas.find().exec((err, ligas)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion de obtener las ligas'})
        if(!ligas) return res.status(500).send({mensaje:'No existen ligas para mostrar'});
        
        return res.status(200).send({ligas});
    })
}

function obtenerLigasID(req, res) {
    var ligasId = req.params.idLigas;

    Ligas.findById(ligasId, (err, ligaEncontrada) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Liga' });
        if (!ligaEncontrada) return res.status(500).send({ mensaje: 'Error al obtener La Liga' });
        return res.status(200).send({ ligaEncontrada });
    })
}


function editarLigas(req, res) {
    var idLigas = req.params.id;
    var params = req.body;

    
    if (req.user.rol != "ROL_USUARIO") {
        return res.status(500).send({ mensaje: 'No posee los permisos para eliminar las ligas de otros usuarios' });
    }

    delete params.password;
    
    Ligas.findByIdAndUpdate(idLigas, params, { new: true }, (err, ligasActualizadas) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!ligasActualizadas) return res.status(500).send({ mensaje: 'No se a podido editar al Usuario' });

        return res.status(200).send({ ligasActualizadas })
    })
  
}

function eliminarLigas(req, res){
    var idLigas = req.params.id
    /*var idUsuario = req.params.idUsuario;*/


    if (req.user.rol != "ROL_USUARIO") {
        return res.status(500).send({ mensaje: 'No posee los permisos para eliminar las ligas de otros usuarios' });
    }
    
  
    Ligas.findByIdAndDelete(idLigas, ((err, ligaEliminada)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!ligaEliminada) return res.status(500).send({ mensaje: 'No se a podido eliminar la liga' });

        return res.status(200).send({ligaEliminada})
    }))
    
}




module.exports = {
    agregarLigas,
    obtenerLigas,
    obtenerLigasID,
    editarLigas,
    eliminarLigas,
    ejemplo,
}