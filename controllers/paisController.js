import Pais from '../models/paisModel.js';

// Controlador para obtener un pais por su ID
async function getPais(id) {
    try {
        // Buscar el pais por su ID
        const pais = await Pais.findById(id);
        if (!pais) {
            throw new Error('No se encontró el pais');
        }
        return pais;
    } catch (error) {
        throw new Error('Error al obtener el pais: ' + error.message);
    }
}

// Controlador para obtener todos los países
async function getPaises(req, res) {
    try {
        let paises = await Pais.find();
        return paises;
    } catch (error) {
        throw new Error('Error al obtener los paises')
    }
};

// Controlador para crear un nuevo país
async function createPais(body) {
    try {
        const { nombre, continente } = body;

        //Validar campos obligatorios
        if (!nombre || !continente) {
            throw new Error('Todos los campos son obligatorios')
        }
        const nuevoPais = new Pais({
            nombre,
            continente
        })
        return await nuevoPais.save()
    } catch (error) {
        throw new Error('Error al crear el país: ' + error.message);
    }
}

// Controlador para editar un pais existente 
async function updatePais(id, body) {
    try {
        // Validacion de existencia del lugar
        const paisExistente = await Pais.findById(id);
        if (!paisExistente) {
            throw new Error('El pais no existe')
        }

        const paisActualizado = await Pais.findByIdAndUpdate(id, {
            $set: {
                nombre: body.nombre,
                continente: body.continente,
            }

        }, { new: true });
        return paisActualizado;
    } catch (error) {
        throw new Error(error.message);
    }
}

// Controlador para eliminar un lugar
async function deletePais(id) {
    try {
        // Validación de existencia del lugar
        const paisExistente = await Pais.findById(id);
        if (!paisExistente) {
            throw new Error('El Pais no existe');
        }
        const paisEliminado = await Pais.findByIdAndDelete(id);
        return paisEliminado;
    } catch (error) {
        throw new Error(error.message);
    }
}

export { createPais, getPaises, updatePais, deletePais, getPais };