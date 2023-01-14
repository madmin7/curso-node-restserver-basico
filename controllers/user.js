import { request as req, response as res } from 'express';
import bcrypt from 'bcryptjs';
import { emailExiste } from '../helpers/db-validators.js';
import Usuario from '../models/usuario.js';




const usuariosGet = async (req, res) => {
    // const { q, nombre= 'no name', apellido } = req.query;

    const query = { estado: true };

    const { limite = 5, desde = 0 } = req.query;

    // const usuarios = await Usuario.find(query)
    //     .skip(desde)
    //     .limit(limite);

    // const total = await Usuario.countDocuments(query);

    const [ total, usuarios ] = await Promise.all([ 
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(desde)
        .limit(limite)
    ])

    res.status(200).json({
        total,
        usuarios
    });
}

const usuariosPut = async (req, res) => {

    const { id } = req.params;
    const { password, google, correo, _id, ...resto } = req.body;

    if( password ){
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt);
    }
    
    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.status(200).json(usuario);
}


const usuariosPost = async(req, res) => {
    const { nombre, password, correo, rol } = req.body;
 
    try {
        const usuario = new Usuario({ nombre, password, correo, rol });
        
        // Encriptar contrasenia SALT vueltas de encriptacion del pass
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt);

        //Guardar en BD
        await usuario.save();
    
        res.status(200).json({
            usuario
        });
        
    } catch (error) {
        res.status(401).json({
            msj: error
        });
    }
}


const usuariosDelete = async (req, res) => {

    const { id } = req.params;
    const usuarioAutenticado = req.usuario; 
    const usuarioEstadoFalse = await Usuario.findByIdAndUpdate(id, { estado: false }); 


    res.status(200).json({
        usuarioEstadoFalse,
        usuarioAutenticado
    });
}



export {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}