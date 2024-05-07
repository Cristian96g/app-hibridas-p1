import express from "express"
import { createUser, deleteUser, getUsers, updateUser } from "../controllers/usuariosController.js";
import Joi from "joi"

const router = express.Router();

// Esquema de validación para los datos de usuario
const schema = Joi.object({
    nombre: Joi.string()
        .alphanum()
        .min(3)
        .max(10)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,6}$')),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

// Ruta para obtener todos los usuarios
router.get("/", async (req, res) => {
    try {
        let resultado = await getUsers();
        res.status(200).json({
            status: 'success',
            message: 'Usuarios obtenidos correctamente',
            data: resultado
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
});

// Ruta para crear un nuevo usuario
router.post("/", async (req, res) => {
    try {
        let body = req.body;
        // Validar los datos del usuario
        const { error, value } = schema.validate({ nombre: body.nombre, email: body.email, password: body.password });
        if (!error) {
            let resultado = await createUser(body);
            res.status(201).json({
                status: 'success',
                message: 'Usuario creado correctamente',
                data: resultado
            });
        } else {
            res.status(400).json(error);
        }
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
});

// Ruta para actualizar un usuario por su email
router.put("/:email", async (req, res) => {
    try {
        let body = req.body;
        let resultado = await updateUser(body, req.params.email);
        res.status(201).json({
            status: 'success',
            message: 'Usuario modificado correctamente',
            data: resultado
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
});

// Ruta para eliminar un usuario por su email
router.delete("/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const resultado = await deleteUser(email);
        res.status(200).json({
            status: 'success',
            message: 'Usuario eliminado correctamente',
            data: resultado
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
});


export default router;