import express from 'express';
import { createLugar, getLugares, updateLugar, deleteLugar, getLugar, getLugaresByTipo, ordenarLugares } from '../controllers/lugarController.js';
import verificarToken from '../middlewares/auth.js';

const router = express.Router();

// Obtener un lugar por su ID
router.get("/:id",verificarToken, async (req, res) => {
    try {
        const lugar = await getLugar(req.params.id);
        res.status(200).json({
            status: 'success',
            message: 'Lugar obtenido correctamente',
            data: lugar
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
});

// Obtener todos los lugares
router.get("/", async (req, res) => {
    try {
        let resultado = await getLugares();
        res.status(200).json({
            status: 'success',
            message: 'Lugares obtenidos correctamente',
            data: resultado
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
});

// Crear un nuevo lugar
router.post("/",  async (req, res) => {
    try {
        let resultado = await createLugar(req);
        res.status(201).json({
            status: 'success',
            message: 'Lugar creado correctamente',
            data: resultado
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
});

// Actualizar un lugar existente por su ID
router.put("/:id", verificarToken, async (req, res) => {
    try {
        let body = req.body;
        let resultado = await updateLugar(req.params.id, body);
        res.status(200).json({
            status: 'success',
            message: 'Lugar actualizado correctamente',
            data: resultado
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
});

// Eliminar un lugar existente por su ID
router.delete("/:id",verificarToken,  async (req, res) => {
    try {
        let resultado = await deleteLugar(req.params.id);
        res.status(200).json({
            status: 'success',
            message: 'Lugar eliminado correctamente',
            data: resultado
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
});

// Obtener lugares por tipo
router.get("/tipo/:tipo", async (req, res) => {
    try {
        const tipo = req.params.tipo;
        const lugares = await getLugaresByTipo(tipo);
        res.status(200).json({
            status: 'success',
            message: `Lugares de tipo ${tipo} obtenidos correctamente`,
            data: lugares
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
});

// Ordenar lugares por puntuación
router.get("/ordenar/:orden", async (req, res) => {
    try {
        const orden = req.params.orden;
        const lugaresOrdenados = await ordenarLugares(orden);
        res.status(200).json({
            status: 'success',
            message: `Lugares ordenados correctamente en orden ${orden}`,
            data: lugaresOrdenados
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
});


export default router;