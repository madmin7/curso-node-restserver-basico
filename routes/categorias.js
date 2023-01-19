import  { Router } from 'express';
import { check } from 'express-validator';
import { 
        obtenerCategorias, 
        crearCategoria, 
        actualizarCategoria, 
        borrarCategoria,
        obtenerCategoria
    } from '../controllers/categorias.js';
import { existeCategoria } from '../helpers/db-validators.js';

import { 
    validarCampos, 
    validarJWT, 
    esAdminRol
    }from '../middlewares/index.js';


const routerCategorias = Router();

//obtener todas las categorias
routerCategorias.get('/', obtenerCategorias);

//obtener una categorias por id
routerCategorias.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], obtenerCategoria );

//crear una nueva categoria - cualquiera con token valido
routerCategorias.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria );

//actualizar una categoria - cualquiera con token valido
routerCategorias.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], actualizarCategoria);

//borrar una categoria - solo admin
routerCategorias.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], borrarCategoria );


export default routerCategorias;