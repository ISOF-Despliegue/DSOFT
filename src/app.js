require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT;

app.get('/calculadora', (req, res) => {
  res.send('Servidor funcionando 🚀');
});

app.get('/calculadora/sumar', (req, res) => {
  const { a, b } = req.query;

  const resultado = Number(a) + Number(b);

  res.json({ resultado });
});

app.get('/calculadora/restar', (req, res) => {
  const { a, b } = req.query;

  const resultado = Number(a) - Number(b);

  res.json({ resultado });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});