const { Usuario, Categoria, Producto } = require('../models');
const Role = require('../models/role');

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

const emailExiste = async (correo) => {
    const existeEmail = await Usuario.findOne({ correo }) //Uso de la librearía express validator
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya se encuentra registrado en nuestra BD.`);
    }

}

const existeUsuarioporId = async (id) => {
    const existeUsuario = await Usuario.findById(id); //Uso de la librearía express validator
    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe en la BD.`);
    }

}

const existeCategoriaId = async (id) => {
    const existeCategoria = await Categoria.findById(id); //Uso de la librearía express validator
    if(!existeCategoria || existeCategoria.estado === false) {
        throw new Error(`El id ${id} no existe en la BD.`);
    }
}

const existeProductoId = async (id) => {
    const existeProducto = await Producto.findById(id); //Uso de la librearía express validator
    if(!existeProducto || existeProducto.estado === false) {
        throw new Error(`El id ${id} no existe en la BD.`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioporId,
    existeCategoriaId,
    existeProductoId,
}