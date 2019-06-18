const Post = require('../models/Post') //  Importa a tabela de dados do models Post
const sharp = require('sharp'); // Biblioteca para manipular iamgens redimensionamento 
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res) {
        const posts  = await Post.find().sort('-createdAt'); // Puxa as imagens de acordo com a data da criação de forma decrescente

        return res.json(posts);
    }, // Middleware de tempo real para cadastrar na tabela

   async store(req, res) {
       const {author, place, description, hastags} = req.body; // Recuperando informações que estão dentro do req
       const {filename: image} = req.file;

       const [name] = image.split('.'); // Salvando foto apenas em jpg
        const fileName = `${name}.jpg`;

        await sharp(req.file.path) // Pega o caminho da imagem
            .resize(500)
            .jpeg ({quality: 70})
            .toFile(
                path.resolve(req.file.destination, 'resized', fileName)
            )
        fs.unlinkSync(req.file.path)
       const post = await Post.create({
           author,
           place,
           description,
           hastags,
           image: fileName 
       });
        req.io.emit('post', post); // Vai emitir a informação para todos os usuarios

       return res.json(post);
   } // Cadastra novos post dentro da API
}; // Objeto com metodos do controller