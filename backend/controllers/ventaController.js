const ventaModel=require('../models/modelVenta');



exports.regVenta = async(req,res) =>{

    const {esConsumidorFinal, puntosGanados, numero_factura, nit, total_sin_descuento, total_con_descuento, productos } = req.body;
    const idSucursal=req.session.sucursal_id;
    const idEmpleado=req.session.userId;
    
    const loQeViene=req.body;
    console.log("Esto es lo que viene \n ",loQeViene);
    //console.log("Datos obtenidos: ID empleado "+idEmpleado+" id Sucursal: "+idSucursal+" es consumidor final "+esConsumidorFinal+" puntos: "+puntosGanados+" factura  "+numero_factura+" nit "+nit+" total sin descueto "+total_sin_descuento+" total con descuento "+total_con_descuento+" productos: ",productos);

    try{
        
        const venta= await ventaModel.registrarVenta(esConsumidorFinal,puntosGanados,numero_factura, nit, idEmpleado, idSucursal, total_sin_descuento, total_con_descuento, productos);
        res.status(201).json({message:'Venta realizada ',ven:venta});
    } catch (error) {
        console.error('Error registrando la venta:', error);
        res.status(500).json({ error: 'Error al registrar la venta' });
    }


}