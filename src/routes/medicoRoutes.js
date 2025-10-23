import express from 'express';
import medicoController from '../controllers/medicoController.js';

const router = express.Router();

// CRUD
router.get('/', medicoController.getAll);
router.get('/:id', medicoController.getById);
router.post('/', medicoController.create);
router.put('/:id', medicoController.update);
router.delete('/:id', medicoController.delete);

// Búsquedas
router.get('/dni/:dni', medicoController.getByDNI);
router.get('/especialidad/:especialidad', medicoController.getByEspecialidad);
router.get('/especialidades/all', medicoController.getEspecialidades);

export default router;
