

let Nota = require('../models/nota.model');

module.exports = {

  async list(req, res) {
    
    const { page = 1 }  = req.query;

    const nota = await Nota.paginate({}, { page, limit:10 }).catch((error) => {
      return res.status(400).json(error);
    });
    return res.json(nota);
  },

  async add(req, res) {    
    const nota = await Nota.create(req.body).catch((error) => {
      return res.status(400).json(error);
    });
    return res.json(nota);
  },

  async show(req, res) {    
    const nota = await Nota.findById(req.params.id).catch((error) => {
      return res.status(400).json(error);
    });
    return res.json(nota);
  },

  async update(req, res) {
    const nota = await Nota.findByIdAndUpdate(req.params.id, req.body, { new: true} ).catch((error) => {
      return res.status(400).json(error);
    });
    return res.json(nota);
  },

  async delete(req, res) {
    const nota = await Nota.findByIdAndRemove({ _id: req.params.id }).catch((error) => {
      return res.status(400).json(error);
    });
    return res.json(nota);
  },

  async search(req, res) {
    const nota = await Nota.find({'titulo' : new RegExp(req.params.key, 'i')}).limit(5).catch((error) => {
      return res.status(400).json(error);
    });
    return res.json(nota);
  }

}