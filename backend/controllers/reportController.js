const pool = require('../config/db');


//OBTIENE EL HISTORIAL DE DESCUENTO EN UNA FECHA DADA
exports.historialDescuentos = async (req, res) => {

    const { fecha_inicio, fecha_fin } = req.query;
    try {
        // Validar que las fechas estén presentes
        if (!fecha_inicio || !fecha_fin) {
            return res.status(400).json({ message: 'Debe proporcionar las fechas fecha_inicio y fecha_fin' });
        }
        const historialResult = await pool.query('SELECT * FROM public.obtener_historial_descuentos($1,$2)', [fecha_inicio, fecha_fin]);
        
        const historial = historialResult.rows;
        if (historial.length === 0) {
            return res.status(404).json({ message: 'No se encontraron descuentos en el intervalo dado' });
        }
        // Iterar sobre los resultados y obtener los nombres de los clientes
        for (const venta of historial) {
            const clienteResult = await pool.query(
                `SELECT nombre, apellido FROM ventas.cliente WHERE nit = (SELECT nit FROM ventas.venta WHERE numero_factura = $1)`,
                [venta.numero_factura]
            );
            const cliente = clienteResult.rows[0];
            if (cliente) {
                // Agregar nombre y apellido al objeto de la venta
                venta.nombre_cliente = cliente.nombre;
                venta.apellido_cliente = cliente.apellido;
            }
        }
        // Enviar los resultados
        res.status(200).json({ historia: historial });
    } catch (error) {
        console.log("Error al obtener el historial: " + error.message);

        res.status(500).json({ message: 'no se pudieron obtener el historial' });
    }
}
//OBTIENE LAS VENTAS MAS GRANDES EN UN INTERVALO DE TIEMPO
exports.getTopVentas = async (req, res) => {

    const { fecha_inicio, fecha_fin } = req.query;

    try {
        // Validar que las fechas estén presentes
        if (!fecha_inicio || !fecha_fin) {
            return res.status(400).json({ message: 'Debe proporcionar las fechas fecha_inicio y fecha_fin' });
        }
        const historialResult = await pool.query(`SELECT * FROM obtener_top_ventas($1,$2)`, [fecha_inicio, fecha_fin]);
        
        const historial = historialResult.rows;
        if (historial.length === 0) {
            return res.status(404).json({ message: 'No se encontraron descuentos en el intervalo dado' });
        }

        for (const venta of historial) {
            const clienteResult = await pool.query(
                `SELECT nombre, apellido FROM ventas.cliente WHERE nit = (SELECT nit FROM ventas.venta WHERE numero_factura = $1)`,
                [venta.numero_factura]
            );
            const cliente = clienteResult.rows[0];
            if (cliente) {
                // Agregar nombre y apellido al objeto de la venta
                venta.nombre_cliente = cliente.nombre;
                venta.apellido_cliente = cliente.apellido;
            }
        }

        // Enviar los resultados
        res.status(200).json({ historia: historial });

    } catch (error) {

        console.log("Error al obtener el top ventas: " + error);

        res.status(500).json({ message: 'no se pudieron obtener el historial' });

    }
}

//OBTIENE LAS 2 SUCURSALES CON MAS INGRESOS 
exports.getSucursalesMasIngresos = async (req, res) => {
  
    try {

        const historial = await pool.query(`SELECT * FROM obtener_top_sucursales()`);


        // Enviar los resultados
        res.status(200).json({ historia: historial.rows });

    } catch (error) {

        console.log("Error al obtener el historial: " + error.message);

        res.status(500).json({ message: 'no se pudieron obtener el historial' });

    }

}

//OBTIENE LOS PRODUCTOS MAS VENDIDOS LOS 10
exports.getArticulosMasVendidos = async (req, res) => {
    try {
        // Ejecutar la función SQL
        const resultado = await pool.query('SELECT * FROM obtener_top_articulos()');

        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron artículos más vendidos' });
        }

        // Enviar los resultados en la respuesta
        res.status(200).json({ articulos: resultado.rows });

    } catch (error) {
        console.log('Error al obtener artículos más vendidos: ', error.message);
        res.status(500).json({ message: 'Error al obtener artículos más vendidos' });
    }
};


//OBTIENE LOS 10 CLIENTES MAS GASTONES
exports.getTopClientesMasGastones = async (req, res) => {

    try {
        const historial = await pool.query(`SELECT * FROM obtener_top_clientes()`);
        if (historial.rows.length === 0) {
            return res.status(404).json({ message: 'No se encontraron articulos mas vendidos' });
        }

        // Enviar los resultados
        res.status(200).json({ historia: historial.rows });

    } catch (error) {

        console.log("Error al obtener el historial: " + error.message);

        res.status(500).json({ message: 'no se pudieron obtener el historial' });

    }

}