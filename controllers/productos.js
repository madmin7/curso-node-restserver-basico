import { request as req, response as res } from 'express';
import { Producto } from '../models/index.js';


const obtenerProductos = async (req, res) => {
    const query = { estado: true };
    const { limite = 5, desde = 0 } = req.headers;


    const [ total, productos ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
                .limit(limite)
                .skip(desde)
                .populate('usuario', 'nombre')
                .populate('categoria', 'nombre')
    ]);

    res.status(200).json({
        total,
        productos
    })
}

const obtenerProducto = async (req, res) => {
    const { id } = req.params;
    try {  
        const producto = await Producto.findById(id)
                                        .populate('usuario', 'nombre')
                                        .populate('categoria', 'nombre')
        res.status(200).json(producto);

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msj: 'No se pudo cargar la lista | hablar con admin'
        })
    }
}

const crearProducto = async (req, res) => {
    const { estado, usuario, ...body } = req.body;

    try {
        const existeProducto = await Producto.findOne({ nombre: body.nombre.toUpperCase() })
                
        if( existeProducto ){
            return res.status(400).json({
                msj: `El producto ${ existeProducto.nombre } ya existe en BD`
            })
        }

        const data = {
            ...body,
            nombre: body.nombre.toUpperCase(),
            usuario: req.usuario._id,
        }

        const producto = new Producto( data );
        producto.populate('usuario', 'nombre');
        producto.populate('categoria', 'nombre');
        await producto.save();

        res.status(201).json(producto);
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            msj: 'No se pudo crear el producto | hablar con admin'
        })
    }
}

const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const {estado, usuario, ...data } = req.body;
    data.usuario = req.usuario.id;

    if( data.nombre ){
        data.nombre = data.nombre.toUpperCase();
    }
    
    try {
        const productoActualizado = await Producto.findByIdAndUpdate( id, data, { new: true } )
                                                    .populate('usuario', 'nombre')
                                                    .populate('categoria', 'nombre')
    
        res.status(200).json(productoActualizado);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msj:'No se pudo realizar la actualizacion'
        })
    }
}

const borrarProducto = async ( req, res ) => {
    const { id } = req.params;
    const query = { estado: false }

    try {
        const productoBorrado = await Producto.findByIdAndUpdate( id, query, { new: true})
                                            .populate('usuario', 'nombre')
                                            .populate('categoria', 'nombre');
        res.status(200).json( productoBorrado );   
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msj:'No se pudo realizar la accion'
        })
    }
}

export {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}