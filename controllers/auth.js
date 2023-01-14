import { response as res, request as req } from "express"
import bcrypt from 'bcryptjs';
import Usuario from "../models/usuario.js";
import { generarJWT } from "../helpers/generarJWT.js";



const login = async ( req, res ) => {

    const { correo, password } = req.body;

    try {
        
        // verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });

        if ( !usuario ){
            return res.status(400).json({
                msj: 'El usuario | password no son correctos - correo'
            })
        }

        //Usuario activo en db
        if( !usuario.estado ){
            return res.status(400).json({
                msj: 'El usuario | password no son correctos - estado false'
            })
        }

        //Verificar contrasenia
        const validPassowrd = bcrypt.compareSync( password, usuario.password )
        if( !validPassowrd ){
            return res.status(400).json({
                msj: 'El usuario | password no son correctos - password'
            })
        }

        // Generar JWT
        const token = await generarJWT( usuario.id );


        res.status(200).json({
            msj: 'AuthPOST',
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msj: 'Algo salio mal comuniquese con el admin'
        })
    }
}


export {
    login
}