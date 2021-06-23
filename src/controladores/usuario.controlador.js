'use strict'

// === Variables de importacion ===
var usuario = require('../modelos/usuarios.modelos');
var bcrypt = require('bcrypt-nodejs');
var jwt = require("../servicios/jwt");

// === Funcion de Usuario por defecto ===
function usuarioAdmin(req, res) {
    var userModelo = new usuario();

    userModelo.nombre = 'ADMIN',
        userModelo.password = 'deportes123',
        userModelo.rol = 'ROL_ADMIN'

    usuario.find({

        $or: [
            { nombre: userModelo.nombre }
        ]
    }).exec((err, adminEncontrado) => {
        if (err) return consele.log('Error al crear el admin')

        if (adminEncontrado.length >= 1) {

            return console.log("El admin ya se creo")

        } else {
            bcrypt.hash('deportes123', null, null, (err, passwordEncriptada) => {

                userModelo.password = passwordEncriptada;


                userModelo.save((err, adminGuardado) => {

                    if (err) return console.log('error en la peticion del Admin')

                    if (adminGuardado) {
                        console.log('Admin Creado ')

                    } else {
                        console.log('Error al crear el Admin')
                    }
                })
            })
        }
    })

}


// === FUNCION DE ELIMINAR USUARIO ===
function eliminarUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    if (req.user.rol != 'ROL_ADMIN') {
        return res.status(500).send({ mensaje: 'Solo el administrador puede eliminar un usuario.' });
    }

    usuario.findByIdAndDelete(idUsuario, (err, usuaiorEliminado) => {
        if (err) {
            return res.status(500).send({ mensaje: 'Error en la peticion de eliminar un usuario' });
        }

        if (!usuarioEliminado) {
            return res.status(500).send({ mensaje: 'Error al eliminar el usuario' });
        }

        return res.status(200).send({ usuarioEliminado });
    })
}




// === Funcion Login === 
function login(req, res) {
    var params = req.body;

    usuario.findOne({ email: params.email }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });

        if (usuarioEncontrado) {
            bcrypt.compare(params.passwoRTCDTMFSender, usuarioEncontrado.password, (err, passvVerificada) => {
                if (passvVerificada) {
                    if (params.getToken === 'true') {
                        return res.status(200).send({
                            token: jwt.createToken(usuarioEncontrado)
                        })
                    } else {
                        usuarioEncontrado.password = undefined;
                        return res.status(200).send({ usuarioEncontrado });
                    }
                } else {
                    return res.status(500).send({ mensaje: 'El usuario no se ha podido identificar' });
                }
            })
        } else {
            return res.status(500).send({ mensaje: 'Erro al buscar el usuario' });
        }
    })
}


function buscarUsuario(req, res) {
    var params = req.body

    usuario.findOne({ nombre: params.nombre }).exec((err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
        if (!usuarioEncontrado) return res.status(500).send({ mensaje: 'No existe ningun usuario en la base de datos' });
        if (usuarioEncontrado) return res.status(200).send({ usuarioEncontrado })
    })
}

function buscarUsuarioID(req, res){
    var usuarioId = req.params.idUsuario;

    usuario.findById(usuarioId,(err, usuarioEncontrado)=>{
        if(err) return res.status(500).send({mensaje:'Error en la peticion'});
        if(!usuarioEncontrado) return res.status(500).send({mensaje:'Error al buscar el usuario'});

        return res.status(200).send({usuarioEncontrado});
    })
}


module.exports = {
    usuarioAdmin,
    eliminarUsuario,
    login,
    buscarUsuario,
    buscarUsuarioID
}