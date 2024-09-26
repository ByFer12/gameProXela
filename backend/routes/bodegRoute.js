// routes/bodegRoute.js
const express = require('express');
const router = express.Router();
const productController=require('../controllers/productController');

//rutas para Bodeguero
router.post('/addGame', productController.moveProductToBodega);

router.get('/getGames', productController.getAllProductssss);

router.get('/games',productController.obtenerEnBodega)

module.exports=router;