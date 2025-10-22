import express from 'express';
import pacienteController from '../controllers/pacienteController.js';

const router = express.Router();

// Buscar por DNI primero para evitar conflicto con :id
router.get('/dni/:dni', pacienteController.getByDNI);

// CRUD
router.get('/', pacienteController.getAll);
router.get('/:id', pacienteController.getById);
router.post('/', pacienteController.create);
router.put('/:id', pacienteController.update);
router.delete('/:id', pacienteController.delete);

export default router;
