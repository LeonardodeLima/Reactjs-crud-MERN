const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Nota = new Schema({
  titulo: {
    type: String
  },
  conteudo: {
    type: String
  }
},{
    collection: 'nota'
});

module.exports = mongoose.model('nota', Nota);
