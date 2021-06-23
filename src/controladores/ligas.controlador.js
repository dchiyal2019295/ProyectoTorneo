'use strict'

var Ligas = require('../modelos/ligas.modelos');

function agregarLigas(req, res){
    var ligasModel = new Ligas();
    var params = req.body;

    if(req.user.rol != "ROL_USUARIO"){
        return res.status(500).send({mensaje: 'Solo el rol de tipo Usuario puede agregar ligas'});
    }
    
    if(params.nombre && params.descripcion){
        ligasModel.nombre = params.nombre;
        ligasMosel.descripcion = params.descripcion;

        ligasModel.save((err, ligaGuardada)=>{
            if(err) return res.status(500).send({mensakje: 'Error en la peticion de la Liga'})
            if(!ligaGuardada) return res.status(500).send({mensaje: 'Error al agregar la liga'})
        
            return res.status(200).send({ligaGuardada});
        })
    }
}

function agregarEquipos(req, res){
    var params = req.body;
    var idLiga = req.params.id;

    Ligas.findByIdAndUpdate(idLiga, { $push: { equipos: { nombreEquipo: params.nombreEquipo, imagenEquipo: params.imagenEquipo}}},
        {new: true}, (err, equipoAgregado)=>{
            if(equipoAgregado.equipos.length > 0){
                for (let i = 0; i < equipoAgregado.equipos.lenght; i++);
            }
        })
}

function eliminarLigas(req, res){
    var params = req.body;
    var idLigas = req.params.id
    
    Ligas.findOne({ _id: idLigas}).exec((err, LigasEncontrado)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if (!LigasEncontrado) return res.status(500).send({ mensaje: 'No se ha encontrado la liga que desea eliminar'})
    
        Ligas.findByIdAndDelete(idLigas, (err, LigasEncontrado)=>{
            if(err) return res.status(500).send({ mensaje:'Error en la peticion'});
            if(!LigasEncontrado) return res.status(500).send({ mensaje:'No se ha podido eliminar la Liga'})

            if(LigasEliminado) return res.status(200).send({mensaje: 'Se ha eliminado correctamente'})
        })    
    })
    
}

function editarLigas(req,res){
    var params = req.body;
    var idLiga = req.params.id

    Ligas.find({nombre: params.nombre}).exec((err,ligaEncontrada)=>{
        if (err) return res.status(500).send({Mensaje: 'Error en la peticion'});
    
        if(ligaEncontrada && ligaEncontrada.length >= 1){
            return res.status(500).send({mensaje: 'El nombre ya esta en uso'})
        }else{
            
            Ligas.findOne({ _id: idLiga}).exec((err,ligaEncontrada ) =>{
                if(err) return res.status(500).send({ Mensaje: 'Error en la peticion que desea'});

                if(!ligaEncontrada) return res.status(500).send({ Mensaje: 'No existen los datos '});

                    Ligas.findByIdAndUpdate(idLiga)
            })
        }
    })

}

function editarEquipo(req,res){
    
    
}

module.exports = {
    eliminarLigas
}