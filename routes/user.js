import { Router } from 'express';
import { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } from '../controllers/user.js';

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);


export default router;