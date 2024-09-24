const clientModel = require('../models/clientsModel')

//agregar cliente por el cajero
exports.addClient=async(req, res)=>{

    const{nit, nombre, apellido, total_gastado,puntos,tipo_tarjeta,direccion,telefono} = req.body;

    try {
        
        const cliente= await clientModel.crearCliente(nit,nombre,apellido,total_gastado,puntos,tipo_tarjeta,direccion,telefono);
        res.status(201).json({message:'Cliente agregado ',client:cliente});
        
    } catch (error) {
        await pool.query('ROLLBACK');
        console.log("No se agrego el cliente: "+error.message);
        res.status(500).json({message:'no se pudo agregar el cliente'});
    }



}

//solicitar editar cliente por el cajero 
exports.edithClient=async(req, res)=>{
    const{nit, nombre, apellido, direccion, telefono} = req.body;
    try {
        const cliente= await clientModel.solicitarEditarCliente(nit, nombre, apellido, direccion, telefono);
        res.status(201).json({message:'Solicitud enviada ',client:cliente});
        
    } catch (error) {
        console.log("No se enviar solicitud el cliente: "+error.message);
        res.status(500).json({message:'No se pudo agregar la solicitud'});
    }

}
//Cliente editadoooo por el administrador
exports.edithClientadmin=async(req, res)=>{
    const{nit, nombre, apellido, direccion, telefono, id_solicitud} = req.body;
    try {
        const cliente= await clientModel.editarClienteAdmin(nit, nombre, apellido, direccion, telefono);
        const edith= await clientModel.aprobarSolicitudEdicion(id_solicitud);
        
        res.status(201).json({message:'Cliente editado ',client:cliente});
        
    } catch (error) {
        await pool.query('ROLLBACK');
        console.log("No se enviar solicitud el cliente: "+error.message);
        res.status(500).json({message:'no se pudo edithar el cliente'});
    }

}

//Obtener solicitudes de edicion esto para el ADMIN
exports.getSolicitudes=async(req, res)=>{
    try {
        const solicitud= await clientModel.obtenerSolicitudesEdicion();
        res.status(201).json({message:'Solicitud editar usuario ',sol:solicitud});
        
    } catch (error) {
        console.log("No se enviar solicitud el cliente: "+error.message);
        res.status(500).json({message:'no se pudo obtener la solicitud de edicion'});
    }

}

//Obtener CLIENTE POR NIT por el CaJERO
exports.getClientNit=async(req, res)=>{
    const{nit} = req.params;
    try {
        const cliente= await clientModel.obtenerClientePorNit(nit);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.status(201).json({message:'Cliente encontrado ',client:cliente});
        
    } catch (error) {
        console.log("No se enviar solicitud el cliente: "+error.message);
        res.status(500).json({message:'no se pudo obtener el cliente'});
    }

}