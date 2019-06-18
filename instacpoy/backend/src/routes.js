const express = require('express');
const uploadConfig = require('./config/upload');
const multer = require('multer');

const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');



const routes = new express.Router();
const upload = multer(uploadConfig); // cadastrando o multer dentro uma variável


routes.get('/posts', PostController.index) // Pega
routes.post('/posts', upload.single('image'), PostController.store) // Middleware = interceptor de requisição na // Chama o metodo stroe dentro do PostController // Posta 

routes.post('/posts/:id/like', LikeController.store);


module.exports = routes; // Exporta as rotas para serem usadas