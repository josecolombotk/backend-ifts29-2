import mongoose from 'mongoose';

// Esquema Paciente
const pacienteSchema = new mongoose.Schema({
  Nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    minlength: [2, 'El nombre debe tener al menos 2 caracteres']
  },
  Apellido: {
    type: String,
    required: [true, 'El apellido es obligatorio'],
    minlength: [2, 'El apellido debe tener al menos 2 caracteres']
  },
  DNI: {
    type: String,
    required: [true, 'El DNI es obligatorio'],
    match: [/^\d{7,8}$/, 'El DNI debe tener 7 u 8 dígitos'],
    unique: true
  },
  Telefono: {
    type: String,
    default: ''
  },
  Email: {
    type: String,
    match: [/.+@.+\..+/, 'El email no es válido'],
    default: ''
  },
  FechaNacimiento: {
    type: Date,
    required: false
  }
}, {
  timestamps: true
});

// Métodos estáticos equivalentes
pacienteSchema.statics.getAll = function () {
  return this.find();
};

pacienteSchema.statics.getById = function (id) {
  return this.findById(id);
};

pacienteSchema.statics.createPaciente = async function (data) {
  const paciente = new this(data);
  return await paciente.save();
};

pacienteSchema.statics.updatePaciente = async function (id, data) {
  const paciente = await this.findByIdAndUpdate(id, data, { new: true });
  if (!paciente) throw new Error('Paciente no encontrado');
  return paciente;
};

pacienteSchema.statics.deletePaciente = async function (id) {
  const paciente = await this.findByIdAndDelete(id);
  if (!paciente) throw new Error('Paciente no encontrado');
  return paciente;
};

pacienteSchema.statics.getByDNI = function (dni) {
  return this.findOne({ DNI: dni });
};

const Paciente = mongoose.model('Paciente', pacienteSchema);
export default Paciente;
