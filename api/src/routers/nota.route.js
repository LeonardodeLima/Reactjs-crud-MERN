const express = require('express');
const notaRoutes = express.Router();

const  NotaController =  require("../controllers/NotaController");

notaRoutes.get('/lista', NotaController.list );
notaRoutes.get('/show/:id', NotaController.show );
notaRoutes.post('/add', NotaController.add );
notaRoutes.post('/update/:id', NotaController.update );
notaRoutes.delete('/delete/:id', NotaController.delete );
notaRoutes.get('/search/:key', NotaController.search );

module.exports = notaRoutes;
