const ventaModel=require('../models/modelVenta');



exports.regVenta = async(req,res) =>{

    const {esConsumidorFinal, puntosGanados, numero_factura, nit, total_sin_descuento, total_con_descuento, productos } = req.body;
    const idSucursal=req.session.sucursal_id;
    const idEmpleado=req.session.userId;
    console.log("Id empleado venta: "+idEmpleado+" y su sucursal es: "+idSucursal);

    try{
        
        const venta= await ventaModel.registrarVenta(esConsumidorFinal,puntosGanados,numero_factura,nit,idEmpleado,idSucursal,total_sin_descuento,total_con_descuento, productos);
        res.status(201).json({message:'Venta realizada ',ven:venta});
    } catch (error) {
        console.error('Error registrando la venta:', error.message);
        res.status(500).json({ error: 'Error al registrar la venta' });
    }


}