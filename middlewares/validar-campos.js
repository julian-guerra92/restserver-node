const { validationResult } = require('express-validator');


const validarCampos = (req, res, next) => {    //Validación de los errores generados en la solicitud

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
}

module.exports = {
    validarCampos
}