// models/Pais.js
import mongoose from 'mongoose';

const paisSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  continente: {
    type: String,
    required: true
  }
});

const Pais = mongoose.model('Pais', paisSchema);

export default Pais;
