// app.js
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const adminRoute = require('./routes/adminRoute');
const bodegRoute =require('./routes/bodegRoute');
const invRoute=require('./routes/invRoute');
const cajeroRoute=require('./routes/cajeroRoute');
const  {isAuthenticated, isRole } = require('./middleware/authMiddleware');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173', // El origen de tu frontend (Vite)
  credentials: true, // Si estás usando cookies o sesiones
}));

app.use(session({
  secret: 'tu_secreto_aqui',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Cambiar a true si usas HTTPS
    httpOnly: true,
  },
}));

app.use('/auth', authRoutes);

app.use('/admin', isAuthenticated, isRole("ADMINISTRADOR"),adminRoute);
app.use('/bodega', isAuthenticated, isRole("BODEGA"),bodegRoute);
app.use('/invent', isAuthenticated, isRole("INVENTARIO"),invRoute);
app.use('/cajero', isAuthenticated, isRole("CAJERO"), cajeroRoute);
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
