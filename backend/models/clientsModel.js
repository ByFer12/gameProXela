const pool=require('../config/db');

//insertar nuevo cliente
exports.crearCliente= async(nit, nombre, apellido, direccion,telefono )=>{
  console.log("Cliente 2 Nit:  "+nit+" Nombre: "+nombre+" Apelldio: "+apellido+" direccion: "+direccion+" telefono: "+telefono)


    const result= await pool.query('INSERT INTO ventas.cliente (nit, nombre, apellido, direccion,telefono) VALUES($1,$2,$3,$4,$5) RETURNING*',
    [nit, nombre, apellido, direccion,telefono]);
    await pool.query('COMMIT');
    return result.rows[0];
}

exports.getAllClients= async( )=>{

    const result= await pool.query('SELECT * FROM ventas.cliente')
    return result.rows;
}



//solicitar editar datos
exports.solicitarEditarCliente = async (nit, nombre, apellido, direccion, telefono) => {
  console.log("Cliente 2 Nit:  "+nit+" Nombre: "+nombre+" Apelldio: "+apellido+" direccion: "+direccion+" telefono: "+telefono)
    const result = await pool.query(
      `INSERT INTO ventas.solicitud_edit_cliente (nit, nombre, apellido, direccion, telefono) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [nit, nombre, apellido, direccion, telefono]
    );
  
    return result.rows[0]; 
  };
  
  exports.getSoliTarjeta=async()=>{
  
    const result=await pool.query(`SELECT*FROM public.obtener_solicitudes_con_cliente()`)
    return result.rows;
  }

  exports.editarTipoTarjetaCliente = async (nit, tipo_tarjeta,id) => {
    try {
      const result = await pool.query(
        `UPDATE ventas.cliente 
         SET tipo_tarjeta = $2
         WHERE nit = $1
         RETURNING *`,
        [nit, tipo_tarjeta]
      );

      await pool.query(
        `UPDATE ventas.solicitud_tarjeta
         SET aprobado = true
         WHERE id = $1`,
        [id]
      );
      
      // Retornar el cliente actualizado
      return result.rows[0]; 
    } catch (error) {
      console.error('Error al actualizar el tipo de tarjeta:', error);
      throw error; // Manejar el error de manera apropiada
    }
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
    return result.rows[0];
  };

exports.editarClienteAdmin = async (nit, nombre, apellido, direccion, telefono) => {

    const result = await pool.query(
      `UPDATE ventas.cliente 
       SET nombre = $2, apellido = $3, direccion = $4, telefono = $5
       WHERE nit = $1
       RETURNING *`,
      [nit, nombre, apellido, direccion, telefono]
    );
   // Finalizar la transacción
  
    return result.rows[0]; // Retorna el cliente actualizado
  };

  //OBTENER CLIENTE A PARTIR DE SU NIT
exports.obtenerClientePorNit = async (nit) => {
    
      const result = await pool.query(
        'SELECT * FROM ventas.cliente WHERE nit = $1', // Consulta SQL
        [nit] // Parámetro NIT
      );
      if (result.rows.length === 0) {
        return result.rows[0];
      }
      return result.rows[0];
  };
  