import Turno from '../models/Turno.js';

const turnoController = {
  async getAll(req, res) {
    try {
      const turnos = await Turno.getAll();
      res.status(200).json({ success: true, data: turnos, count: turnos.length });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener turnos', error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const turno = await Turno.getById(req.params.id);
      if (!turno) return res.status(404).json({ success: false, message: 'Turno no encontrado' });
      res.status(200).json({ success: true, data: turno });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener turno', error: error.message });
    }
  },

  async create(req, res) {
    try {
      const nuevoTurno = await Turno.createTurno(req.body);
      res.status(201).json({ success: true, message: 'Turno creado', data: nuevoTurno });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Error al crear turno', error: error.message });
    }
  },

  async update(req, res) {
    try {
      const turno = await Turno.updateTurno(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'Turno actualizado', data: turno });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Error al actualizar turno', error: error.message });
    }
  },

  async delete(req, res) {
    try {
      await Turno.deleteTurno(req.params.id);
      res.status(200).json({ success: true, message: 'Turno eliminado' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar turno', error: error.message });
    }
  }
};

export default turnoController;
