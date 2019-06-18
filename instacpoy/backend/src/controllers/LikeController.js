const Post = require('../models/Post') //  Importa a tabela de dados do models Post

module.exports = {
   async store(req, res) {
        const post = await Post.findById(req.params.id);  // Parametros definidos na rotaa

        post.likes += 1; // soma mais um

        await post.save();

        req.io.emit('like', post);

    return res.json(post);
   } // Cadastra novos post dentro da API
}; // Objeto com metodos do controller