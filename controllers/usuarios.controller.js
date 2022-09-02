const { response } = require('express'); //Se debe hacer para usar los métodos de res
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs'); //Librería para encriptar constraseñas

const usuariosGet = async (req, res = response) => {

    //Configuración de la solicitud http para mostras los datos de la BD
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    //Método utilizado para ejecutar todas las promesas de manera simultanea. Reduce el tiempo de respuesta
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query), //Método para contar la cantidad de documentos o datos.
        Usuario.find(query) //Método de consuta. Se envía el objeto para filtrar los que estén activos
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({ total, usuarios });
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol }); //Se instancia el modelo de mongoose

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en BD    
    await usuario.save(); //Se utiliza este método para guardar la información en mongo db

    res.json(usuario);
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body; //Desestructuración del objeto para usar lo que realmente se necesita

    //TODO validar contra base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    //Buscar en BD para actualizar valores
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'put API - Controlador'
    });
}

const usuariosDelete = async (req, res = response) => {

    const {id} = req.params;

    //Físicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id); //No se recomienda de esta manera porque puede necesitarse después

    //Cambiando el estado del usuario 
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json(usuario);
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}