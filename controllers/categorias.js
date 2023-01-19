import { request as req, response as res } from 'express';
import { Categoria } from '../models/index.js';


//paginado - total cuantas categorias? - populate
const obtenerCategorias = async (req, res) => {
    const query = { estado: true };
    const { limite = 5, desde = 0 } = req.headers;

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
                .populate('usuario', 'nombre')
                .limit(limite)
                .skip(desde)
    ])

    res.status(200).json({
        total,
        categorias
    });
}

const obtenerCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        const categoria = await Categoria.findById(id).populate('usuario', 'nombre')

        res.status(200).json({
            categoria
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msj: 'No se pudo encontrar la categoria',
            id
        });
    }
}

const crearCategoria = async (req, res) => {
    const nombre = req.body.nombre.toUpperCase();
    const existeNombreEnDB = await Categoria.findOne({ nombre });

    if( existeNombreEnDB ){
        return res.status(400).json({
            msj: `La categoria ${ existeNombreEnDB.nombre } ya existe en BD`
        })
    }
    const data = {
        nombre, 
        usuario: req.usuario._id
    }
    const categoria = new Categoria( data );
    await categoria.save();
    
    res.status(201).json({
        categoria
    });
}

// recibir nombre, el nombre nuevo no deberia existir
const actualizarCategoria = async (req, res) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    data.nombre  = data.nombre.toUpperCase();
    data.usuario = req.usuario.id; 

    try { 
        const categoria = await Categoria.findOneAndUpdate( id, data, { new: true })
                                                .populate('usuario')
        
        res.status(200).json(categoria);
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msj: 'Error al actualizar la categoria | llame a admin'
        })
    }
}

// cambiar estado a false
const borrarCategoria = async (req, res) => {
    const { id } = req.params;

    try {
        const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true })
        res.status(200).json(categoriaBorrada);
    
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msj: 'Error al eliminar la categoria | llame a admin'
        })
    }
}

// //! repaso:::

// //paginado - total cuantas categorias? - populate
// const obtenerCategorias2 = async (req, res) => {
// }

// const obtenerCategoria2 = async (req, res) => {
// }

// const crearCategoria2 = async (req, res) => {
// }

// // recibir nombre, el nombre nuevo no deberia existir
// const actualizarCategoria2 = async (req, res) => {                                                         
// }

// // cambiar estado a false
// const borrarCategoria2 = async (req, res) => {
// }





export {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}