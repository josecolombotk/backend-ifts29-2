import express from 'express';
import turnoController from '../controllers/turnoController.js';

const router = express.Router();

// CRUD de turnos
router.get('/', turnoController.getAll);
router.get('/:id', turnoController.getById);
router.post('/', turnoController.create);
router.put('/:id', turnoController.update);
router.delete('/:id', turnoController.delete);

export default router;
