const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

let notaSchema = new Schema({
  titulo: {
    type: String,
    required:true
  },
  conteudo: {
    type: String,
    required:true
  },
  datetime: {
    type: Date,
    default: Date.now
  } 
},
{
  collection: 'Nota'
});

notaSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Nota', notaSchema);
