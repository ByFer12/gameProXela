const express=require('express');
const router =express.Router();
const clienController=require('../controllers/clientController');
const ventaController=require('../controllers/ventaController');
const productController =require('../controllers/productController');


router.post('/addClient',clienController.addClient);
router.post('/editClient',clienController.edithClient);
router.post('/venta',ventaController.regVenta);
//obtenemos el cliente a partir de su nit 
router.get('/client/:nit', clienController.getClientNit); 
//obtenemos los productos para seleccionar
router.get('/productStock', productController.obtenerProductos);



module.exports=router;