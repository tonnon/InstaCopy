const mongoose = require('mongoose'); // Importa o mongoose para manipular dados do MongoDB

const PostSchema = new mongoose.Schema({
    author: String,
    place: String,
    description: String,
    hastags: String,
    image: String,
    likes: {
        type: Number,
        default: 0,
    }
},{
    timestamps: true, // Cria um campo em cada campo, CreatedAdd, Updated add. Data de criação e ultima alteração de cada campo
}); // Define as colunas da tebela de dados

module.exports = mongoose.model('Post', PostSchema);

