const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models')

const coleccionesPermitidas = [
    'categorias',
    'usuarios',
    'productos',
    'roles'
]

const buscarUsuarios = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino); //True
    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario && usuario.estado) ? [usuario] : []
        });
    }
    const regex = new RegExp(termino, 'i'); //Expresión irregular para ampliar la búsqueda
    //Método para usar filtros en las busquedas
    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });
    res.json({
        results: usuarios
    });
}

const buscarCategorias = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino); //True
    if (esMongoID) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria && categoria.estado) ? [categoria] : []
        });
    }
    const regex = new RegExp(termino, 'i'); //Expresión irregular para ampliar la búsqueda
    //Método para usar filtros en las busquedas
    const categorias = await Categoria.find({ nombre: regex, estado: true });
    res.json({
        results: categorias
    });
}

const buscarProductos = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino); //True
    if (esMongoID) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');
        if (!producto) {
            const productos = await Producto.find({ categoria: ObjectId(termino), estado: true })
                .populate('categoria', 'nombre');
            return res.json({
                results: productos
            });
        }
        return res.json({
            results: (producto && producto.estado) ? [producto] : []
        });
    }
    const regex = new RegExp(termino, 'i'); //Expresión irregular para ampliar la búsqueda
    //Método para usar filtros en las busquedas
    const productos = await Producto.find({
        $or: [{ nombre: regex }, { descripcion: regex }],
        $and: [{ estado: true }]
    }).populate('categoria', 'nombre');
    res.json({
        results: productos
    });
}

const buscar = (req, res = response) => {
    const { coleccion, termino } = req.params;
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colescciones permitidas son: ${coleccionesPermitidas}`
        })
    }
    switch (coleccion) {
        case 'categorias':
            buscarCategorias(termino, res);
            break;
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta búsqueda'
            });

    }
}

module.exports = {
    buscar
}