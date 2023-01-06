import { request as req, response as res } from 'express';


const usuariosGet = (req, res) => {

    const { q, nombre= 'no name', apellido } = req.query;

    res.status(200).json({
        msj: 'get API - Controller', 
        q, 
        nombre,
        apellido
    });
}

const usuariosPut = (req, res) => {

    const id = req.params.id;


    res.status(200).json({
        msj: 'put API - usuariosPut',
        id
    });
}

const usuariosPost = (req, res) => {

    const { nombre, apellido, id } = req.body;

    res.status(200).json({
        id,
        nombre,
        apellido,
        msj: 'post API - usuariosPost'
    });
}

const usuariosDelete = (req, res) => {
    res.status(200).json({
        msj: 'delete API - usuariosDelete'
    });
}



export {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}