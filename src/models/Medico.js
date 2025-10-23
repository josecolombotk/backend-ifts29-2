import mongoose from 'mongoose';

// Definición del esquema para la colección "medicos"
const medicoSchema = new mongoose.Schema({
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
    Especialidad: {
        type: String,
        required: [true, 'La especialidad es obligatoria'],
        minlength: [3, 'La especialidad debe tener al menos 3 caracteres']
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true }, // Importante para que el virtual aparezca en JSON
    toObject: { virtuals: true }
});

// Virtual para IdMedico
medicoSchema.virtual('IdMedico').get(function () {
    return this._id.toHexString();
});

// Métodos estáticos
medicoSchema.statics.getAll = async function () {
    return await this.find();
};

medicoSchema.statics.getById = async function (id) {
    return await this.findById(id);
};

medicoSchema.statics.createMedico = async function (data) {
    const medico = new this(data);
    return await medico.save();
};

medicoSchema.statics.updateMedico = async function (id, data) {
    const medico = await this.findByIdAndUpdate(id, data, { new: true });
    if (!medico) {
        throw new Error('Médico no encontrado');
    }
    return medico;
};

medicoSchema.statics.deleteMedico = async function (id) {
    const medico = await this.findByIdAndDelete(id);
    if (!medico) {
        throw new Error('Médico no encontrado');
    }
    return medico;
};

medicoSchema.statics.getByDNI = async function (dni) {
    return await this.findOne({ DNI: dni });
};

medicoSchema.statics.getByEspecialidad = async function (especialidad) {
    return await this.find({ Especialidad: { $regex: new RegExp(especialidad, 'i') } });
};

medicoSchema.statics.getEspecialidades = async function () {
    const especialidades = await this.distinct('Especialidad');
    return especialidades.sort();
};

// Exportar modelo
const Medico = mongoose.model('Medico', medicoSchema);
export default Medico;
