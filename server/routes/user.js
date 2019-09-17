const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const app = express();

app.get('/user/:id', (req, res) => {
  if (!req.headers.password) {
    return res.status(404).json({ ok: false, err: { message: 'Password invalid' } });
  }

  User.findOne({ username: req.params.id }, (err, userDB) => {
    if (err) return res.status(500).json({ ok: false, err });
    if (!userDB) return res.status(404).json({ ok: false, err: { message: 'Username or password invalid' } });
    if (!bcrypt.compareSync(req.headers.password, userDB.password)) return res.status(404).json({ ok: false, err: { message: 'Username or password invalid' } });

    res.json({ ok: true, User: userDB });
  });
});

app.get('/user', (req, res) => {
  User.find({}, (err, usersDB) => {
    if (err) return res.status(400).json({ ok: false, err });
    res.json({ ok: true, users: usersDB });
  });
});

app.post('/user', (req, res) => {
  const body = req.body;

  const user = new User({
    ...req.body,
    password: bcrypt.hashSync(body.password, 10)
  });

  user.save((err, userDB) => {
    if (err) return res.status(400).json({ ok: false, err });

    res.json({ ok: true, user: userDB });
  });
});

app.put('/user/:id', (req, res) => {
  const id = req.params.id;
    // let body = req.body;
  // eslint-disable-next-line no-undef
  const body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

  delete body.password;
  delete body.google;

  User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
    if (err) return res.status(400).json({ ok: false, err });


    res.json({ ok: true, usuario: userDB });
  });
});

app.delete('/user/:id', (req, res) => {
  const id = req.params.id;

    // baja logica
  User.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, userDB) => {
    if (err) return res.status(400).json({ ok: false, err });
    if (!userDB) return res.status(400).json({ ok: false, err: { message: 'usuario no encontrado' } });

    res.json({ ok: true, usuario: userDB });
  });
});

module.exports = app;
