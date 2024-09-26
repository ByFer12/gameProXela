const pool =require('../config/db');


// Insertar una nueva venta y su detalle
exports.registrarVenta = async (esConsumidorFinal,puntosGanados,numero_factura, nit, empleado_id, sucursal_id, total_sin_descuento, total_con_descuento, productos) => {
  console.log("HOLAAAAAAAAAAAAAAAAAAAAAAAAAA")
        // Insertar la venta en la tabla `ventas.venta`
    console.log("Datos obtenidos: ID empleado "+empleado_id+" id Sucursal: "+sucursal_id+" es consumidor final "+esConsumidorFinal+" puntos: "+puntosGanados+" factura  "+numero_factura+" nit "+nit+" total sin descueto "+total_sin_descuento+" total con descuento "+total_con_descuento+" productos: ",productos);

        const resultVenta = await pool.query(
            `INSERT INTO ventas.venta (numero_factura, nit, total_sin_descuento, total_con_descuento, empleado_id, sucursal_id) 
             VALUES ($1, $2, $3, $4, $5, $6) 
             RETURNING *`,
            [numero_factura, nit, total_sin_descuento, total_con_descuento, empleado_id, sucursal_id]
        );

         
        const ventaId = resultVenta.rows[0].id; // Obtener el ID de la venta recién creada
        if (!esConsumidorFinal) {

          //Insertamos en una tabla el historial de descuentos
          const historialDescuentos=await pool.query(`INSERT INTO ventas.historial_descuentos(venta_id,descuento)
           VALUES($1,$2) RETURNING *`,
          [ventaId,puntosGanados]);

            //Actualizamos el total de gastos del cliente
            const actualizarcliente=  await pool.query(
              `UPDATE ventas.cliente 
               SET  total_gastado = total_gastado + $1 
               WHERE nit = $2 
               RETURNING *`,
              [total_con_descuento, nit]
            );

            console.log("Cliente actualizado: "+actualizarcliente[0]);
          }

        // Insertar los productos en la tabla `detalle_venta`
        for (let producto of productos) {
            const { producto_id, cantidad, precio_unitario,gastado } = producto;
          console.log("DETALLE DE VENTAS")
            await pool.query(
                `INSERT INTO ventas.detalle_venta (venta_id, producto_id, cantidad, precio_unitario,gastado) 
                 VALUES ($1, $2, $3, $4,$5) RETURNING *`,
                [ventaId, producto_id, cantidad, precio_unitario,gastado]
            );
        }
        return resultVenta[0];
};
