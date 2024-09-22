// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController=require('../controllers/userController');

//ruta para loguearse y desloguearse
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;