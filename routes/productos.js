import { Router } from 'express';
import { check } from 'express-validator';
import { 
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto 
} from '../controllers/productos.js'
import { existeProducto, existeUsuarioPorId } from '../helpers/db-validators.js';
import { validarJWT, validarCampos, esAdminRol } from '../middlewares/index.js';

const routerProductos = Router();


routerProductos.get('/', obtenerProductos);

routerProductos.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
], obtenerProducto);

routerProductos.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').isMongoId(),
    check('categoria').custom( existeUsuarioPorId ),
    validarCampos
], crearProducto );

routerProductos.put('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
]
, actualizarProducto);

routerProductos.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
], borrarProducto)

export default routerProductos;