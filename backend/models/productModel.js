const pool=require('../config/db');

exports.addProductBodega=async(id_sucursal,id_producto,id_empleado,cantidad,id_bodega)=>{

    const result= await pool.query('INSERT INTO sucursales.ingreso_bodega (sucursal_id,producto_id,empleado_id,cantidad,bodega_id) VALUES($1,$2,$3,$4,$5) RETURNING*',
    [id_sucursal,id_producto,id_empleado,cantidad,id_bodega]);
    return result.rows[0];
}


exports.addProdBodegaToPassillo=async(id_sucursal, id_producto, cantidad, pasillo, id_empleado)=>{

        const result=await pool.query('INSERT INTO sucursales.ingreso_pasillo (sucursal_id, producto_id, cantidad, pasillo, empleado) VALUES($1, $2, $3, $4, $5) RETURNING*',
        [id_sucursal,id_producto,cantidad,pasillo,id_empleado]);
        return result.rows[0];
}
// Obtener todos los productos sin detalles
exports.getAllProducts = async () => {
    const result = await pool.query('SELECT nombre,precio FROM products');
    return result.rows;
  };

exports.obtenerProductosStock= async()=>{
    const result= await pool.query('SELECT *FROM get_full_product_inventory()');
    return result.rows;
}

// Obtener todos los productos con detalles
exports.getAllProductsDetails = async () => {
    const result = await pool.query('SELECT * FROM products');
    return result.rows;
  };

