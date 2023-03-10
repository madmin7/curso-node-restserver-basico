import Rol from '../models/rol.js';
import Usuario from '../models/usuario.js';



const esRolValido = async( rol = '' ) => {
    const existeRol = await Rol.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no esta permitido`);
    }
}

const emailExiste = async ( correo = '' ) => {
    const existeEmail = await Usuario.findOne({ correo: correo });
    if ( existeEmail ){
        throw new Error(`El correo ya se encuentra registrado`);
    }
}

const existeUsuarioPorId = async ( id ) => {
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ){
        throw new Error(`El id ${ id }, no existe`);
    }
}

export {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}