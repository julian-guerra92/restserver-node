const validarCampos     = require('./validar-campos');
const validarJWT        = require('./validar-jwt');
const tieneRole         = require('./validar-roles');
const validarArchivo    = require('./validar-archivo');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...tieneRole,
    ...validarArchivo
}