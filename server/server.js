// eslint-disable-next-line jsx-a11y/href-no-hash
import express, { static as createStatic } from 'express';
import { connect } from 'mongoose';
import { resolve } from 'path';
import { urlencoded, json } from 'body-parser';

// eslint-disable-next-line
import './config/config';

const app = express();
// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: false }));
// parse application/json
app.use(json());

// habilitar la carpeta public
app.use(createStatic(resolve(__dirname, '../public')));

// configuracion global de las rutas
app.use(require('./routes/index'));

connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
  if (err) throw err;

  console.log('Database Online');
});

app.listen(process.env.PORT, () => console.log('Server is listening port', process.env.PORT));
