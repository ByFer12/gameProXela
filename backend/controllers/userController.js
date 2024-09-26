const pool = require('../config/db');
const bcript = require('bcrypt');
const saltRounds = 10;


exports.crearUsuario = async (req, res) => {

    const { nombre, apellido, username, password, rol, numero_caja, sucursal_id } = req.body;
    try {
        const hashedPassword = await bcript.hash(password, saltRounds);
        const result = await pool.query('INSERT INTO sucursales.empleado (nombre,apellido,username,password, rol, numero_caja,sucursal_id) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *'
            , [nombre, apellido, username, hashedPassword, rol, numero_caja, sucursal_id]);
            await pool.query('COMMIT');
        res.status(201).json({ message: "Usuario agregado correctamente", empleado: result.rows[0] });
    } catch (e) {
        console.log("error al crear usuario: "+e)
        await pool.query('ROLLBACK');
        res.status(500).json({ message: "No se pudo registrar" })

    }

};

exports.obtenerUsuarios = async (req, res) => {
    try {
        // Ejecutar la consulta para obtener todos los usuarios
        const result = await pool.query('SELECT * FROM sucursales.empleado');
        
        // Enviar la respuesta con los usuarios
        res.status(200).json({ usuarios: result.rows });
    } catch (e) {
        // Manejo de errores
        console.error(e);
        res.status(500).json({ message: "No se pudo obtener la lista de usuarios" });
    }
};