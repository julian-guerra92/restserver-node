const { response } = require('express'); //Se debe hacer para usar los métodos de res

const usuariosGet = (req, res = response) => {

    const {q, nombre = "No name", apikey} = req.query;

    res.json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey
    });
}

const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: 'post API - Controlador',
        nombre,
        edad
    });
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - Controlador',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'put API - Controlador'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'put API - Controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}