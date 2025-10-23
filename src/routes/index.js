import express from 'express';
import pacienteRoutes from './pacienteRoutes.js';
import medicoRoutes from './medicoRoutes.js';
import turnoRoutes from './turnoRoutes.js';

const router = express.Router();


// Ruta raíz 
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Backend IFTS-29 API - Grupo 4',
        message: 'Servidor funcionando correctamente',
        description: 'API REST para gestión médica con MongoDB (migrada desde JSON)'
    });
});

// Vistas individuales
router.get('/pacientes', (req, res) => res.render('pacientes'));
router.get('/medicos', (req, res) => res.render('medicos'));
router.get('/turnos', (req, res) => res.render('turnos'));

// Endpoint de diagnóstico 
router.get('/api/status', (req, res) => {
    res.json({
        status: 'success',
        message: 'API funcionando correctamente con MongoDB',
        timestamp: new Date().toISOString(),
        viewEngine: 'Pug',
        moduleSystem: 'ES6 Modules',
        database: 'MongoDB',
        endpoints: {
            pacientes: '/api/pacientes',
            medicos: '/api/medicos',
            turnos: '/api/turnos',
            status: '/api/status'
        }
    });
});

// Rutas de la API
router.use('/api/pacientes', pacienteRoutes);
router.use('/api/medicos', medicoRoutes);
router.use('/api/turnos', turnoRoutes);

export default router;
