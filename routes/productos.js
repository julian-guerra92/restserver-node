const { Router } = require('express');
const { check } = require('express-validator');
const { 
    obtenerProductos,
    obtenerProducto,
    crearProdcuto,
    actualizarProducto,
    borrarProducto
} = require('../controllers/productos');
const { existeCategoriaId, existeProductoId } = require('../helpers/db_validators');

const { 
    validarJWT, 
    validarCampos, 
    esAdminRole 
} = require('../middlewares/');

const router = Router();

//{{url}}/api/productos/

//Obtener todas las categorias - publico
router.get('/', obtenerProductos);

//Obtener un producto por id - publico
router.get ('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
], obtenerProducto);

//Crear producto - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un ID válido').isMongoId(),
    check('categoria').custom(existeCategoriaId),
    validarCampos
], crearProdcuto);

//Actualizar - privado - cualquier token válido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
], actualizarProducto)

//Borrar un producto - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeProductoId),
    validarCampos
], borrarProducto);

module.exports = router; 