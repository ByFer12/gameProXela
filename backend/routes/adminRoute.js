// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const userController=require('../controllers/userController');
//rutas que el admin realiza
router.post('/register', userController.crearUsuario);

module.exports=router;