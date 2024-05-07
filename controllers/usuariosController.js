import Usuario from "../models/usuariosModel.js";
import bcrypt from "bcrypt"


// Controlador para obtener todos los usuarios
async function getUsers() {
    try {
        let usuarios = await Usuario.find();
        // let usuarios = await Usuario.find({estado: true});
        return usuarios;
    } catch (error) {
        throw new Error('Error al obtener usuarios: ' + error.message);
    }
}

// Controlador para crear un usuario
async function createUser(body) {
    try {
        const { nombre, password, email } = body

        let user = new Usuario({
            nombre: nombre,
            password: bcrypt.hashSync(password, 10),
            email: email,
            estado: true
        })
        return await user.save();
    } catch (error) {
        throw new Error('Error al crear el usuario: ' + error.message);
    }
}

// Controlador para editar un usuario existente mediante el email
async function updateUser(body, email) {
    try {
        const emailExistente = await Usuario.findOne({ email: email });
        if (!emailExistente) {
            throw new Error('El email no existe')
        }
        let user = await Usuario.updateOne({ "email": email }, {
            $set: {
                nombre: body.nombre,
                password: body.password
            }
        })
        return user;
    } catch (error) {
        throw new Error('Error al actualizar el usuario: ' + error.message);
    }
}

// Controlador para eliminar un usuario mediante el email
async function deleteUser(email) {
    try {
        const resultado = await Usuario.findOneAndDelete({ email: email });
        if (!resultado) {
            throw new Error('El usuario no existe');
        }
        return resultado;
    } catch (error) {
        throw new Error('Error al eliminar el usuario: ' + error.message);
    }
}

export { getUsers, createUser, updateUser, deleteUser }