import { response as res, request as req } from "express"
import bcrypt from 'bcryptjs';
import Usuario from "../models/usuario.js";
import { generarJWT } from "../helpers/generarJWT.js";
import { googleVerify } from '../helpers/google-verify.js'


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


const googleSignIn = async ( req, res ) => {
    const { id_token } = req.body;

    try {
        const { email, name, picture } = await googleVerify( id_token );
       
        let usuario = await Usuario.findOne({ correo: email });

        if( !usuario ){
            usuario = await new Usuario({ 
                nombre: name, 
                correo: email,
                password: ':p',
                img: picture,
                google: true
             })

             await usuario.save();
        }

        if ( !usuario.estado ){
            return res.staus(401).json({
                msj: 'Hable con el admin - usuario bloqueado'
            })
        }

        // Generar JWT
        const token = await generarJWT( usuario.id );

        res.status( 200 ).json({
            msj: 'todo ok',
            token,
            usuario
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msj: 'Error no se pudo verificar el usuario'
        })
    }
}




export {
    login,
    googleSignIn
}