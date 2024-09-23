// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const userController=require('../controllers/userController');
const clientController= require('../controllers/clientController');
const reportController=require('../controllers/reportController')
//rutas que el admin realiza
router.post('/register', userController.crearUsuario);
router.get('/soliEdith', clientController.getSolicitudes);
router.post('/eClient', clientController.edithClientadmin);

//REPORTES
router.get('/descs',reportController.historialDescuentos);
router.get('/vents',reportController.getTopVentas);
router.get('/suc',reportController.getSucursalesMasIngresos);
router.get('/art',reportController.getArticulosMasVendidos);
router.get('/clients',reportController.getTopClientesMasGastones);

module.exports=router;