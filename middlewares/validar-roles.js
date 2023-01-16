import { request, response } from "express";



const esAdminRol = ( req = request, res= response, next ) => {

    if( !req.usuario ){
        return res.status(500).json({
            msj: 'Para verificar el rol se requiere un token valido'
        })
    }

    const { rol, nombre } = req.usuario;

    if( rol !== 'ADMIN_ROL'){
        return res.status(401).json({
            msj: `${ nombre } no es administrador`
        })
    }
    next();
}


const tieneRol = ( ...roles) => {

    return ( req = request, res= response, next ) => {

        if( !req.usuario ){
            return res.status(500).json({
                msj: 'Se quiere verificar el rol sin validar el token'
            })
        }

        const { rol } = req.usuario;

        if ( !roles.includes( rol ) ){
            return res.status(401).json({
                msj: `Se requiere uno de estos roles ${ roles }`
            })
        }

        next()
    }
}


export {
    esAdminRol,
    tieneRol
}