import mongoose from 'mongoose';

const turnoSchema = new mongoose.Schema({
  Fecha: {
    type: Date,
    required: [true, 'La fecha del turno es obligatoria']
  },
  Hora: {
    type: String,
    required: [true, 'La hora del turno es obligatoria']
  },
  Motivo: {
    type: String,
    default: ''
  },
  Estado: {
    type: String,
    enum: ['pendiente', 'confirmado', 'cancelado'],
    default: 'pendiente'
  },
  Paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paciente',
    required: [true, 'Debe asignarse un paciente']
  },
  Medico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medico',
    required: [true, 'Debe asignarse un médico']
  }
}, {
  timestamps: true
});

// Métodos estáticos
turnoSchema.statics.getAll = function () {
  return this.find().populate('Paciente').populate('Medico');
};

turnoSchema.statics.getById = function (id) {
  return this.findById(id).populate('Paciente').populate('Medico');
};

turnoSchema.statics.createTurno = async function (data) {
  const turno = new this(data);
  return await turno.save();
};

turnoSchema.statics.updateTurno = async function (id, data) {
  const turno = await this.findByIdAndUpdate(id, data, { new: true }).populate('Paciente').populate('Medico');
  if (!turno) throw new Error('Turno no encontrado');
  return turno;
};

turnoSchema.statics.deleteTurno = async function (id) {
  const turno = await this.findByIdAndDelete(id);
  if (!turno) throw new Error('Turno no encontrado');
  return turno;
};

const Turno = mongoose.model('Turno', turnoSchema);
export default Turno;
