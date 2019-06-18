const multer = require ('multer');
const path = require('path'); // Biblioteca nativa para lidar com caminhos entre ambientes Windows Unix.

module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'), // Onde eu quero salvar as iamgens
        filename: function(req, file, cb) {
            cb(null, file.originalname);//função que chama o nome da imagem
        } //
    }) // Salva as iamgens dentro do projeto
}; // Tipo de storage que o multer vai usar