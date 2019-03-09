const express = require('express');
const notaRoutes = express.Router();
let Nota = require('../models/nota.model');


notaRoutes.route('/add').post(function (req, res) {
  
  let nota = new Nota(req.body);
  
  nota.save()
    .then(nota => {
      res.status(200).json({'nota': 'nota in added successfully'});
    })
    .catch(err => {
      res.status(400).send(err + "unable to save to database");
    });
    
});

notaRoutes.route('/lista').get(function (req, res) {
  Nota.find(function(err, nota){
    if(err) res.json(err); 
      res.json(nota);
  });
});

notaRoutes.route('/update/:id').post(function (req, res) {
    Nota.findById(req.params.id, function(err, nota) {
    if (!nota)
      res.status(404).send("data is not found");
    else {
        
        nota.titulo = req.body.titulo;
        nota.conteudo = req.body.conteudo;

        nota.save().then(nota => {
          res.json('Update complete');
        }).catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

notaRoutes.route('/delete/:id').delete(function (req, res) {
    Nota.findByIdAndRemove({_id: req.params.id }, function(err, nota){
        if(err){
          res.json(err);
        }else{
          res.json('Successfully removed');
        } 
    });
});


notaRoutes.route('/search/:key').get(function (req, res) {
  Nota.find({'titulo' : new RegExp(req.params.key, 'i')}, function(err, notas) {    
    if (err) {
      res.json(err);
    }else{
      console.log(notas)
      res.json(notas);
    }
  }).limit(5);
});


module.exports = notaRoutes;
