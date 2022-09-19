const { Router } = require('express');
const { check } = require('express-validator');
const {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
} = require('../controllers/categorias');
const { existeCategoriaId } = require('../helpers/db_validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares/');

const router = Router();

//{{url}}/api/categorias

//Obtener todas las categorías - público
router.get('/', obtenerCategorias);

//Obtener una categoría por id - público
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos
], obtenerCategoria);

//Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar - privado - cualquiera con un token válido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos
], actualizarCategoria);

//Borrar una categoría - admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaId),
    validarCampos
], borrarCategoria);

module.exports = router; 