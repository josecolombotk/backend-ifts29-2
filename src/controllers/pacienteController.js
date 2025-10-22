import Paciente from '../models/Paciente.js';

const pacienteController = {
  async getAll(req, res) {
    try {
      const pacientes = await Paciente.getAll();
      res.status(200).json({ success: true, data: pacientes, count: pacientes.length });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener pacientes', error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const paciente = await Paciente.getById(req.params.id);
      if (!paciente) return res.status(404).json({ success: false, message: 'Paciente no encontrado' });
      res.status(200).json({ success: true, data: paciente });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener paciente', error: error.message });
    }
  },

  async create(req, res) {
    try {
      const nuevoPaciente = await Paciente.createPaciente(req.body);
      res.status(201).json({ success: true, message: 'Paciente creado', data: nuevoPaciente });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Error al crear paciente', error: error.message });
    }
  },

  async update(req, res) {
    try {
      const actualizado = await Paciente.updatePaciente(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'Paciente actualizado', data: actualizado });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Error al actualizar paciente', error: error.message });
    }
  },

  async delete(req, res) {
    try {
      await Paciente.deletePaciente(req.params.id);
      res.status(200).json({ success: true, message: 'Paciente eliminado' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar paciente', error: error.message });
    }
  },

  async getByDNI(req, res) {
    try {
      const paciente = await Paciente.getByDNI(req.params.dni);
      if (!paciente) return res.status(404).json({ success: false, message: 'No encontrado' });
      res.status(200).json({ success: true, data: paciente });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al buscar paciente por DNI', error: error.message });
    }
  }
};

export default pacienteController;
