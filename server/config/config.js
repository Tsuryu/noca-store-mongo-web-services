// PUERTO
// eslint-disable-next-line jsx-a11y/href-no-hash
process.env.PORT = process.env.PORT || 3006;

// ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'local';

// BASE DE DATOS
const urlDB = process.env.NODE_ENV === 'local' ? 'mongodb://root:example@localhost:27018/unlz?authSource=admin' : process.env.MONGO_URI;
process.env.URLDB = urlDB;

// TOKEN - AUTENTICACION
process.env.TOKEN_EXPIRATION_TIME = '2d';
process.env.SEED = process.env.SEED || 'la-clave-secreta-para-generar-token-unlz';
