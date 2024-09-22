//rutas para el inventario
const express = require('express');
const router = express.Router();
const productController=require('../controllers/productController');

//rutas para Inventario
router.post('/vender', productController.moverProdBodegaToPasillo);
router.get('/productStock', productController.obtenerProductos);

module.exports=router;