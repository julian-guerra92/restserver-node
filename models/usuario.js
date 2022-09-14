
const {Schema, model} = require('mongoose'); //Modelo para almacenar la información en base de datos

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String, 
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

//Sobre escritura de método para evitar visualizar __v y password
UsuarioSchema.methods.toJSON = function () {
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id; //Método para cambiar nombre a la variable
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);