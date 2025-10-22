import Paciente from '../models/Paciente.js';

const pacienteController = {
  // Obtener todos los pacientes
  async getAll(req, res) {
    try {
      const pacientes = await Paciente.find(); // find() devuelve un array
      // Convertir cada paciente para que tenga IdPaciente en lugar de _id
      const data = pacientes.map(p => {
        const { _id, __v, ...rest } = p.toObject();
        return { IdPaciente: _id, ...rest };
      });
      res.status(200).json({ success: true, data, count: data.length });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener pacientes', error: error.message });
    }
  },

  // Obtener paciente por ID
  async getById(req, res) {
    try {
      const paciente = await Paciente.findById(req.params.id);
      if (!paciente) return res.status(404).json({ success: false, message: 'Paciente no encontrado' });
      const { _id, __v, ...rest } = paciente.toObject();
      res.status(200).json({ success: true, data: { IdPaciente: _id, ...rest } });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener paciente', error: error.message });
    }
  },

  // Crear paciente
  async create(req, res) {
    try {
      const nuevoPaciente = new Paciente(req.body);
      await nuevoPaciente.save();
      const { _id, __v, ...rest } = nuevoPaciente.toObject();
      res.status(201).json({ success: true, message: 'Paciente creado', data: { IdPaciente: _id, ...rest } });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Error al crear paciente', error: error.message });
    }
  },

  // Actualizar paciente
  async update(req, res) {
    try {
      const actualizado = await Paciente.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!actualizado) return res.status(404).json({ success: false, message: 'Paciente no encontrado' });
      const { _id, __v, ...rest } = actualizado.toObject();
      res.status(200).json({ success: true, message: 'Paciente actualizado', data: { IdPaciente: _id, ...rest } });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Error al actualizar paciente', error: error.message });
    }
  },

  // Eliminar paciente
  async delete(req, res) {
    try {
      const eliminado = await Paciente.findByIdAndDelete(req.params.id);
      if (!eliminado) return res.status(404).json({ success: false, message: 'Paciente no encontrado' });
      res.status(200).json({ success: true, message: 'Paciente eliminado' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar paciente', error: error.message });
    }
  },

  // Obtener paciente por DNI
  async getByDNI(req, res) {
    try {
      const paciente = await Paciente.findOne({ DNI: req.params.dni });
      if (!paciente) return res.status(404).json({ success: false, message: 'Paciente no encontrado' });
      const { _id, __v, ...rest } = paciente.toObject();
      res.status(200).json({ success: true, data: { IdPaciente: _id, ...rest } });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al buscar paciente por DNI', error: error.message });
    }
  }
};

export default pacienteController;
