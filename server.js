require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const itemsRouter = require('./routes/items');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('MongoDB conectado'))
  .catch(err => console.error('Erro MongoDB:', err.message));

app.use('/api/items', itemsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Servidor: http://localhost:${PORT}`));
