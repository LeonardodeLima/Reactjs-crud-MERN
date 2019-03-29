const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config(); 

const notaRoute = require('./src/routers/nota.route');
   
  const PORT = process.env.PORT || 4000;
  const DATABASE = process.env.DATABASE_URL;

  mongoose.Promise = global.Promise;
  mongoose.connect(DATABASE, { useNewUrlParser: true }).then( () => {
    console.log('Database is connected');
    }, err => { 
    console.log("Can't connect to the database"+ err)}
  );

app.use(cors());
app.use(express.json());
app.use('/nota', notaRoute);

app.get('/', function(req, res, next) {
  res.status(202).send({ status:"ON" });
 return next();
});

app.listen(PORT, function(){ 
    console.log('Server is running on:', PORT ); 
  }).on('error', function(err) { 
    console.log('Server is stopped, error:', err);
});