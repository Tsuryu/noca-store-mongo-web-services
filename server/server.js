require('./config/config');
const express = require('express');
const cors = require('cors');

const app = express();
const mongoose = require('mongoose');
const path = require('path');

app.use(cors());

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

// configuracion global de las rutas
app.use(require('./routes/index'));

var connectWithRetry = function() {
  return mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, function(err) {
      if (err) {
          console.error('Failed to connect to mongo on startup - retrying in 1 sec', err);
          setTimeout(connectWithRetry, 1000);
      } else {
        console.log('Base da datos ONLINE');
      }
  });
};
connectWithRetry();
// mongoose.set('useCreateIndex', true);

app.listen(process.env.PORT, () => console.log('escuchando puerto', process.env.PORT));
