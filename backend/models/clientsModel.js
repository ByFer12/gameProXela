const pool=require('../config/db');

//insertar nuevo cliente
exports.crearCliente= async(nit, nombre, apellido, total_gastado,puntos,tipo_tarjeta,direccion,telefono )=>{
    const result= await pool.query('INSERT INTO ventas.cliente (nit, nombre, apellido, total_gastado,puntos,tipo_tarjeta,direccion,telefono) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING*',
    [nit, nombre, apellido, total_gastado,puntos,tipo_tarjeta,direccion,telefono]);
    await pool.query('COMMIT');
    return result.rows[0];
}


//solicitar cambiar tarjeta



//solicitar editar datos
exports.solicitarEditarCliente = async (nit, nombre, apellido, direccion, telefono) => {
    const result = await pool.query(
      `INSERT INTO ventas.solicitud_edit_cliente (nit, nombre, apellido, direccion, telefono) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [nit, nombre, apellido, direccion, telefono]
    );
  
    return result.rows[0]; 
  };

  //obtener solicitudes editar cliente
exports.obtenerSolicitudesEdicion = async () => {
    const result = await pool.query(
      `SELECT * FROM ventas.solicitud_edit_cliente WHERE aprobado = false`
    );
  
    return result.rows; 
  };
  
 // Aprobar la solicitud de edición de cliente
exports.aprobarSolicitudEdicion = async (id) => {
    const result = await pool.query(
      `UPDATE ventas.solicitud_edit_cliente 
       SET aprobado = true 
       WHERE id = $1 
       RETURNING *`,  
      [id]
    );
   // Finalizar la transacción
   await pool.query('COMMIT');
    return result.rows[0];
  };

exports.editarClienteAdmin = async (nit, nombre, apellido, direccion, telefono) => {
    const result = await pool.query(
      `UPDATE ventas.cliente 
       SET nombre = $2, apellido = $3, direccion = $4, telefono = $5
       WHERE id = $1
       RETURNING *`,
      [nit, nombre, apellido, direccion, telefono]
    );
   // Finalizar la transacción
   await pool.query('COMMIT');
    return result.rows[0]; // Retorna el cliente actualizado
  };

  //OBTENER CLIENTE A PARTIR DE SU NIT
exports.obtenerClientePorNit = async (nit) => {
    
      const result = await pool.query(
        'SELECT nombre,apellido FROM ventas.cliente WHERE nit = $1', // Consulta SQL
        [nit] // Parámetro NIT
      );
      if (result.rows.length === 0) {
        return result;
      }
      return result.rows[0];
  };
  