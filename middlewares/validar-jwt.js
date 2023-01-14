import { request, response } from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.js';



const validarJWT = async ( req = request, res = response, next ) => {
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msj: 'El token no es valido | no hay token'
        })
    }

    try {    
        const { usuarioID: uid } = jwt.verify( token, process.env.SECRETKEY );

        const usuario = await Usuario.findById( uid );

        if( !usuario ){
            return res.status(401).json({
                msj: 'Token no valido - usuario no existe'
            })
        }

        //verificar si el uid tiene estado en true
        if( !usuario.estado ){
            return res.status(401).json({
                msj: 'Token no valido - usuario estado false'
            })
        }

        req.usuario = usuario;

        next();

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msj: 'Token no valido'
        })
    }  
}



export {
    validarJWT
}