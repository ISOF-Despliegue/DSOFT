require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cors());

app.get('/calculadora', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Base de datos simulada en memoria
let historial = [];
let idCounter = 1;

// GET: Obtener todo el historial
app.get('/calculadora/historial', (req, res) => {
  res.json(historial);
});

// GET: Obtener un registro específico por ID
app.get('/calculadora/historial/:id', (req, res) => {
  const idBuscado = parseInt(req.params.id);
  const registro = historial.find(item => item.id === idBuscado);

  if (!registro) {
    return res.status(404).json({ error: 'Registro no encontrado' });
  }

  res.json(registro);
});

// POST: Realizar operación y guardar en historial
app.post('/calculadora/operar', (req, res) => {
  const { operacion, a, b } = req.body;

  if (!operacion || a === undefined || b === undefined) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  let resultado;

  switch (operacion) {
    case 'sumar':
      resultado = Number(a) + Number(b);
      break;
    case 'restar':
      resultado = Number(a) - Number(b);
      break;
    case 'multiplicar':
      resultado = Number(a) * Number(b);
      break;
    case 'dividir':
      if (b === 0) {
        return res.status(400).json({ error: 'No se puede dividir entre cero' });
      }
      resultado = Number(a) / Number(b);
      break;
    default:
      return res.status(400).json({ error: 'Operación no válida' });
  }

  const nuevoRegistro = { id: idCounter++, operacion, a, b, resultado };
  historial.push(nuevoRegistro);

  res.status(201).json({ mensaje: 'Operación guardada', registro: nuevoRegistro });
});

// PUT: Reemplazar completamente un registro existente por su ID
app.put('/calculadora/historial/:id', (req, res) => {
  const idBuscado = parseInt(req.params.id);
  const { operacion, a, b, resultado } = req.body;

  const index = historial.findIndex(item => item.id === idBuscado);

  if (index === -1) {
    return res.status(404).json({ error: 'Registro no encontrado' });
  }

  // Reemplazo total del registro
  historial[index] = { id: idBuscado, operacion, a, b, resultado };

  res.json({ mensaje: 'Registro actualizado completamente', registro: historial[index] });
});

// PATCH: Actualizar parcialmente un registro por su ID
app.patch('/calculadora/historial/:id', (req, res) => {
  const idBuscado = parseInt(req.params.id);
  const index = historial.findIndex(item => item.id === idBuscado);

  if (index === -1) {
    return res.status(404).json({ error: 'Registro no encontrado' });
  }

  // Mezcla el objeto existente con las nuevas propiedades recibidas
  const registroActualizado = { ...historial[index], ...req.body };
  historial[index] = registroActualizado;

  res.json({ mensaje: 'Registro actualizado parcialmente', registro: historial[index] });
});

// DELETE: Eliminar un registro por su ID
app.delete('/calculadora/historial/:id', (req, res) => {
  const idBuscado = parseInt(req.params.id);
  const index = historial.findIndex(item => item.id === idBuscado);

  if (index === -1) {
    return res.status(404).json({ error: 'Registro no encontrado' });
  }

  // Elimina 1 elemento en la posición "index"
  const registroEliminado = historial.splice(index, 1);

  res.json({ mensaje: 'Registro eliminado', registro: registroEliminado[0] });
});

// POST: Guardar operación automática en el historial 
app.post('/calculadora/operar', (req, res) => {
  const { operacion, a, b } = req.body;

  if (!operacion || a === undefined || b === undefined) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  let resultado;

  switch (operacion) {
    case 'sumar':
      resultado = Number(a) + Number(b);
      break;
    case 'restar':
      resultado = Number(a) - Number(b);
      break;
    case 'multiplicar':
      resultado = Number(a) * Number(b);
      break;
    case 'dividir':
      resultado = b != 0 ? Number(a) / Number(b) : "No se puede dividir entre cero";
      break;
    default:
      return res.status(400).json({ error: 'Operación no válida' });
  }

  const nuevoRegistro = { id: idCounter++, operacion, a, b, resultado };
  historial.push(nuevoRegistro);

  res.status(201).json({ mensaje: 'Operación realizada y guardada', registro: nuevoRegistro });
});


// PUT: Reemplazar completamente todo el historial 
app.put('/calculadora/historial', (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Se requiere un arreglo completo de registros' });
  }

  historial = req.body;
  idCounter = historial.length + 1;

  res.json({ mensaje: 'Historial reemplazado completamente', historial });
});


// PATCH: Marcar un registro como revisado por su ID 
app.patch('/calculadora/historial/:id/revisar', (req, res) => {
  const idBuscado = parseInt(req.params.id);
  const index = historial.findIndex(item => item.id === idBuscado);

  if (index === -1) {
    return res.status(404).json({ error: 'Registro no encontrado' });
  }

  historial[index] = { ...historial[index], revisado: true };

  res.json({ mensaje: 'Registro marcado como revisado', registro: historial[index] });
});


// DELETE: Eliminar todo el historial 
app.delete('/calculadora/historial', (req, res) => {
  historial = [];
  idCounter = 1;

  res.json({ mensaje: 'Todo el historial fue eliminado' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
