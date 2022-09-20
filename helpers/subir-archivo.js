const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {
    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
        //Validar la extension
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extension ${extension} no es permitida. Extensiones válidas: ${extensionesValidas} `);
        }
        //Método para renombrar el archivo con ID único (uuid)
        const nombreTemp = uuidv4() + '.' + extension;
        //Método para guardar el archivo en el directorio correspondiente
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);
        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(nombreTemp);
        });
    })
}

module.exports = {
    subirArchivo
}