import Usuario from '../models/usuariosModel.js'
import bcrypt from 'bcrypt';
import express from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

const router = express.Router();

// Ruta para autenticar un usuario
router.post('/', async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ email: req.body.email })
        if (usuario) {
            const passwordValido = bcrypt.compareSync(req.body.password, usuario.password);
            if (!passwordValido) return res.status(400).json({ msj: "password incorrecto" });
            const jwToken = jwt.sign({
                usuario: {
                    _id: usuario._id,
                    nombre: usuario.nombre,
                    email: usuario.email
                }
            }, process.env.SEED, { expiresIn: process.env.EXPIRATION });
            return res.json({
                usuario: {
                    _id: usuario._id,
                    nombre: usuario.nombre,
                    email: usuario.email
                },
                jwToken
            });
        } else {
            return res.status(400).json({ msj: "email incorrecto" });
        }
    } catch (error) {
        return res.status(500).json({ msj: "Error al autenticar usuario", error: error.message });
    }
})

export default router;