const pool =require('../config/db');


// Insertar una nueva venta y su detalle
exports.registrarVenta = async (esConsumidorFinal,puntosGanados,numero_factura, nit, empleado_id, sucursal_id, total_sin_descuento, total_con_descuento, productos) => {
        // Iniciar una transacción
        await pool.query('BEGIN');

        // Insertar la venta en la tabla `ventas.venta`
        const resultVenta = await pool.query(
            `INSERT INTO ventas.venta (numero_factura, nit, total_sin_descuento, total_con_descuento, empleado_id, sucursal_id) 
             VALUES ($1, $2, $3, $4, $5, $6) 
             RETURNING id`,
            [numero_factura, nit, total_sin_descuento, total_con_descuento, empleado_id, sucursal_id]
        );
           
        const ventaId = resultVenta.rows[0].id; // Obtener el ID de la venta recién creada
        if (!esConsumidorFinal) {
            console.log("No es consumidor final puntos: "+puntosGanados+" total_gastado: "+total_con_descuento+" nit: "+nit);
          const actualizarcliente=  await pool.query(
              `UPDATE ventas.cliente 
               SET puntos = puntos + $1, total_gastado = total_gastado + $2 
               WHERE nit = $3 
               RETURNING *`,
              [puntosGanados, total_con_descuento, nit]
            );

            console.log("Cliente actualizado: "+actualizarcliente[0]);
          }

        // Insertar los productos en la tabla `detalle_venta`
        for (let producto of productos) {
            const { producto_id, cantidad, precio_unitario,gastado } = producto;

            await pool.query(
                `INSERT INTO ventas.detalle_venta (venta_id, producto_id, cantidad, precio_unitario,gastado) 
                 VALUES ($1, $2, $3, $4,$5)`,
                [ventaId, producto_id, cantidad, precio_unitario,gastado]
            );
        }

        // Finalizar la transacción
        await pool.query('COMMIT');

        return resultVenta[0];


};
