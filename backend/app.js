// app.js
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const adminRoute = require('./routes/adminRoute');
const bodegRoute =require('./routes/bodegRoute');
const invRoute=require('./routes/invRoute');
const  {isAuthenticated, isRole } = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use('/auth', authRoutes);

app.use('/admin', isAuthenticated, isRole("ADMINISTRADOR"),adminRoute);
app.use('/bodega', isAuthenticated, isRole("BODEGA"),bodegRoute);
app.use('/inv', isAuthenticated, isRole("INVENTARIO"),invRoute);
/*
app.use('/products', productRoutes);
*/
// Ruta general para la raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de gestión de productos y usuarios');
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
