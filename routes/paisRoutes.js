import express from 'express';
import { createPais, deletePais, getPais, getPaises, updatePais } from '../controllers/paisController.js';
import verificarToken from '../middlewares/auth.js'

const router = express.Router();

// Obtener un pais por su ID
router.get("/:id", async (req, res) => {
    try {
        const pais = await getPais(req.params.id);
        res.status(200).json({
            status: 'success',
            message: 'Pais obtenido correctamente',
            data: pais
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
});

// Obtener todos los paises
router.get("/",  async (req, res) => {
    try {
        let resultado = await getPaises();
        res.status(200).json({
            status: 'success',
            message: 'Paises obtenidos correctamente',
            data: resultado
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
})

// Crear un nuevo Pais
router.post("/", async (req, res) => {
    try {
        let resultado = await createPais(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Pais creado correctamente',
            data: resultado
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
});

// Actualizar un pais existente por su ID
router.put("/:id", verificarToken, async (req, res) => {
    try {
        let resultado = await updatePais(req.params.id, req.body);
        res.status(200).json({
            status: 'success',
            message: 'Pais actualizado correctamente',
            data: resultado
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
});

// Eliminar un pais existente por su ID
router.delete("/:id", verificarToken, async (req, res) => {
    try {
        let resultado = await deletePais(req.params.id);
        res.status(200).json({
            status: 'success',
            message: 'Pais eliminado correctamente',
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
