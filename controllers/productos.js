const { response } = require("express");
const { Producto, Categoria } = require("../models");

//ObtenerProdcutos usando método populate
const obtenerProductos = async (req, res = response) => {
    //Configuración de la solicitud http para mostras los datos de la BD
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }
    //Método utilizado para ejecutar todas las promesas de manera simultanea. Reduce el tiempo de respuesta
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query), //Método para contar la cantidad de documentos o datos.
        Producto.find(query) //Método de consuta. Se envía el objeto para filtrar los que estén activos
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
    ]);
    res.json({ total, productos });
}

//obtenerProducto usando método populate
const obtenerProducto = async (req, res = response) => {
    const { id } = req.params;
    //Buscar en BD para actualizar valores
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');
    res.json(producto);
}


//Crear categoría
const crearProdcuto = async (req, res = response) => {
    const { estado, usuario, ...body } = req.body;
    const productoBD = await Producto.findOne({nombre: body.nombre});
    if(productoBD){
        return res.status(400).json({
            msg: `EL producto ${productoBD.nombre} ya existe en la BD`
        });
    }
    //Generar data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,
    }
    const producto = new Producto(data);
    //Guardar en BD
    await producto.save();
    res.status(201).json(producto)
}

//actualizarProducto
const actualizarProducto = async (req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;

    //Buscar en BD para actualizar valores
    const prodcuto = await Producto.findByIdAndUpdate(id, data, { new: true });
    res.json(prodcuto);
}

//borrarProducto - estado: false
const borrarProducto = async (req, res = response) => {
    const { id } = req.params;
    //Cambiando el estado del usuario 
    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(productoBorrado);
}


module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProdcuto,
    actualizarProducto,
    borrarProducto
}