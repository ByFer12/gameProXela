// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const userController=require('../controllers/userController');
const clientController= require('../controllers/clientController');
const reportController=require('../controllers/reportController')
//rutas que el admin realiza
router.post('/register', userController.crearUsuario);
router.get('/usuarios',userController.obtenerUsuarios);
router.get('/soliEdith', clientController.getSolicitudes);
router.post('/eClient', clientController.edithClientadmin);
router.get('/soliTar',clientController.getSoliTarjetas);
router.post('/editTar',clientController.editarTipoTarjeta)

//REPORTES
router.get('/desc',reportController.historialDescuentos);
router.get('/vents',reportController.getTopVentas);
router.get('/suc',reportController.getSucursalesMasIngresos);
router.get('/art',reportController.getArticulosMasVendidos);
router.get('/clients',reportController.getTopClientesMasGastones);

module.exports=router;