const { response } = require("express");
const { Categoria } = require('../models');

//ObtenerCategorias usando método populate
const obtenerCategorias = async (req, res = response) => {
    //Configuración de la solicitud http para mostras los datos de la BD
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }
    //Método utilizado para ejecutar todas las promesas de manera simultanea. Reduce el tiempo de respuesta
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query), //Método para contar la cantidad de documentos o datos.
        Categoria.find(query) //Método de consuta. Se envía el objeto para filtrar los que estén activos
            .skip(Number(desde))
            .limit(Number(limite))
            .populate({
                path: 'usuario',
                select: 'nombre correo',
            })
    ]);
    res.json({ total, categorias });
}

//obtenerCategoria usando método populate
const obtenerCategoria = async (req, res = response) => {
    const { id } = req.params;
    //Buscar en BD para actualizar valores
    const categoria = await Categoria.findById(id)
        .populate({
            path: 'usuario',
            select: 'nombre correo',
        });
    res.json(categoria);
}

//Crear categoría
const crearCategoria = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaBD = await Categoria.findOne({ nombre });
    if (categoriaBD) {
        return res.status(400).json({
            msg: `La categoría ${categoriaBD.nombre} ya existe!`
        })
    }
    //Generar data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = await new Categoria(data);
    //Guardar en BD
    await categoria.save();
    res.status(201).json(categoria)
}

//actualizarCategoria
const actualizarCategoria = async (req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoriaBD = await Categoria.findOne(data);
    if (categoriaBD) {
        return res.status(400).json({
            msg: `La categoría ${categoriaBD.nombre} ya existe!`
        })
    }
    //Buscar en BD para actualizar valores
    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });
    res.json(categoria);
}

//borrarCategoria - estado: false
const borrarCategoria = async (req, res = response) => {
    const { id } = req.params;
    //Cambiando el estado del usuario 
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(categoriaBorrada);
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}