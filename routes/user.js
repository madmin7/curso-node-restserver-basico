import { Router } from 'express';
import { check } from 'express-validator';
import { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } from '../controllers/user.js';
import { emailExiste, esRolValido, existeUsuarioPorId } from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';


const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( (rol) => esRolValido(rol) ),
    validarCampos
], usuariosPut);

router.post('/',[
    //express-validator
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail().custom( emailExiste ),                        
    check('password', 'El pass debe tener mas de 6 letras').isLength({ min: 6 }),              
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROL', 'USER_ROL']),
    check('rol').custom( (rol) => esRolValido(rol) ),
    validarCampos              
] ,usuariosPost);

router.delete('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete);


export default router;