import Lugar from '../models/lugarModel.js';

// Controlador para obtener un lugar
async function getLugar(id) {
    try {
        // Buscar el lugar por su ID
        const lugar = await Lugar.findById(id).populate('pais', 'nombre continente -_id');
        if (!lugar) {
            throw new Error('No se encontró el lugar');
        }
        return lugar;
    } catch (error) {
        throw new Error('Error al obtener el lugar: ' + error.message);
    }
}

// Controlador para obtener todos los lugares
async function getLugares(req, res) {
    try {
        let lugares = await Lugar.find().populate('pais', 'nombre continente -_id');
        return lugares;
    } catch (error) {
        // Manejo de errores
        throw new Error('Error al obtener lugares');
    }
}

// Controlador para crear un nuevo lugar
async function createLugar(req) {
    try {
        const { nombre, pais, tipo, popularidad } = req.body;

        // validar campos obligatorios
        if (!nombre || !pais || !tipo || !popularidad) {
            throw new Error('Todos los campos son obligatorios')
        }

        // Validar el formato 
        if (isNaN(popularidad)) {
            throw new Error('La popularidad debe ser un numero')
        }
        const nuevoLugar = new Lugar({
            nombre,
            pais,
            tipo,
            popularidad
        })
        return await nuevoLugar.save()
    } catch (error) {
        throw new Error('Error al crear el lugar: ' + error.message);
    }
}

// Controlador para editar un lugar existente
async function updateLugar(id, body) {
    try {
        // Validacion de existencia del lugar
        const lugarExistente = await Lugar.findById(id);
        if (!lugarExistente) {
            throw new Error('El lugar no existe')
        }

        const lugarActualizado = await Lugar.findByIdAndUpdate(id, {
            $set: {
                nombre: body.nombre,
                pais: body.pais,
                tipo: body.tipo,
                popularidad: body.popularidad
            }

        }, { new: true });
        return lugarActualizado;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Controlador para eliminar un lugar mediante su id
async function deleteLugar(id) {
    try {
        // Validación de existencia del lugar
        const lugarExistente = await Lugar.findById(id);
        if (!lugarExistente) {
            throw new Error('El lugar no existe');
        }
        const lugarEliminado = await Lugar.findByIdAndDelete(id);
        return lugarEliminado;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Controlador para obtener un lugar mediante el tipo
async function getLugaresByTipo(tipo) {
    try {
        const lugares = await Lugar.find({ tipo: tipo }).populate('pais', 'nombre continente -_id');
        return lugares;
    } catch (error) {
        throw new Error('Error al obtener lugares por tipo: ' + error.message);
    }
}

// Controlador para obtener lugares y ordenarlos segun la puntuacion
async function ordenarLugares(orden) {
    let lugares;
    if (orden === 'asc') {
        lugares = await Lugar.find().sort({ popularidad: 1 }).populate('pais', 'nombre continente -_id');
    } else if (orden === 'desc') {
        lugares = await Lugar.find().sort({ popularidad: -1 }).populate('pais', 'nombre continente -_id');
    } else {
        throw new Error('El parámetro de orden no es válido');
    }
    return lugares;
}

export { createLugar, getLugares, updateLugar, deleteLugar, getLugar, getLugaresByTipo, ordenarLugares };