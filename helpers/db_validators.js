const Role = require('../models/role');
const Usuario = require('../models/usuario');
const { response } = require('express'); //Se debe hacer para usar los métodos de res

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
    const existeUsuario = await Usuario.findById(id) //Uso de la librearía express validator
    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe en la BD.`);
    }

}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioporId
}