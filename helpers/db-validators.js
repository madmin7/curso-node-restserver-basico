import { 
    Categoria, 
    Producto, 
    Rol, 
    Usuario 
} from '../models/index.js';




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


const existeCategoria = async ( id ) => {
    const existeCategoria = await Categoria.findById(id);
    if ( !existeCategoria ){
        throw new Error(`No existe una categoria con ese ID`);
    }
}

const existeProducto = async ( id ) => {
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ){
        throw new Error(`No existe un producto con ese ID`);
    }
}


export {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto
}