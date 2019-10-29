const express = require('express');
const Product = require('../models/product');

const app = express();

app.get('/product', (req, res) => {
  Product.find({}, (err, productsDB) => {
    if (err) return res.status(400).json({ ok: false, err });
    res.json({ ok: true, products: productsDB });
  });
});

app.post('/product', (req, res) => {
  const product = new Product({
    ...req.body,
  });

  product.save((err, productDB) => {
    if (err) return res.status(400).json({ ok: false, err });

    res.json({ ok: true, product: productDB });
  });
});

app.delete('/product/:id', (req, res) => {
  const id = req.params.id;

    // baja logica
  Product.findByIdAndDelete(id, (err, productDB) => {
    if (err) return res.status(400).json({ ok: false, err });
    if (!productDB) return res.status(400).json({ ok: false, err: { message: 'product not found' } });

    res.json({ ok: true, product: productDB });
  });
});


module.exports = app;
