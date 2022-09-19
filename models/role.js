const { Schema, model } = require('mongoose');

const RoleSchema = Schema ({
    rol: {
        type: String,
        require: [true, 'El Rol es obligatorio']
    }
});

module.exports = model('Role', RoleSchema);
