// models/Lugar.js
import mongoose from 'mongoose';

const lugarSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  pais: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pais',
    required: true
  },
  tipo: {
    type: String,
    enum: ['parque_nacional', 'monumento_natural', 'sitio_arqueologico', 'reserva_natural', 'centro_cultural', 'playa', 'ciudad_antigua', 'ciudad', 'monumento_historico', 'isla'],
    required: true
  },
  popularidad: {
    type: Number,
    default: 0
  }
});

const Lugar = mongoose.model('Lugar', lugarSchema);

export default Lugar;
