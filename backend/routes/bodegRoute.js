// routes/bodegRoute.js
const express = require('express');
const router = express.Router();
const productController=require('../controllers/productController');

//rutas para Bodeguero
router.post('/addGame', productController.moveProductToBodega);

module.exports=router;