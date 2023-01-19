import { response as res, request as req } from "express";
import { isValidObjectId } from "mongoose";
import { Usuario, Categoria, Producto } from '../models/index.js';

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'rols'
];

const buscarUsuarios = async ( termino = '', res ) => {
    const esMongoID = isValidObjectId( termino );

    if( esMongoID ){
        const usuario = await Usuario.findById(termino);
        return res.status(200).json({
            results: ( usuario ) ? [usuario] : []
        });
    }
    //expresion regular para la busqueda insensible;
    const regexp = new RegExp( termino, 'i' );

    const usuarios = await Usuario.find({ 
        $or: [{nombre: regexp}, {correo: regexp}],
        $and: [{estado: true}]
    })
    
    res.status(200).json({
        results: usuarios
    });
}


const buscarCategorias = async ( termino = '', res ) => {
    const esMondoID = isValidObjectId( termino );

    if( esMondoID ){
        const categoria = await Categoria.findById( termino )
                                        .populate('usuario', 'nombre')
        return res.status(200).json({
            results: ( categoria ) ? [categoria] : []
        })
    }

    const regexp = RegExp( termino, 'i' );

    const categorias = await Categoria.find({ nombre: regexp, estado: true })
                                    .populate('usuario', 'nombre');

    res.status(200).json({
        results: categorias
    })
}

const buscarProductos = async ( termino = '', res ) => {
    const esMondoID = isValidObjectId( termino );

    if( esMondoID ){
        const producto = await Producto.findById( termino )
                                        .populate('usuario', 'nombre')
                                        .populate('categoria', 'nombre')
        return res.status(200).json({
            results: ( producto ) ? [producto] : []
        })
    }

    const regexp = RegExp( termino, 'i' );

    const productos = await Producto.find({ nombre: regexp, estado: true })
                                    .populate('usuario', 'nombre')
                                    .populate('categoria', 'nombre')

    res.status(200).json({
        results: productos
    })
}


const buscar = async ( req, res ) => {
    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes(coleccion) ){
        return res.status(400).json({
            msj: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        })
    }

    switch ( coleccion ) {
        case 'usuarios':
            buscarUsuarios( termino, res );
        break;

        case 'categorias':
            buscarCategorias( termino, res );
        break;

        case 'productos':
            buscarProductos( termino, res );
        break;
    
        default:
            res.status(500).json({
                msj: 'Hable con el administrador.'
            })
    }
}


export {
    buscar
}