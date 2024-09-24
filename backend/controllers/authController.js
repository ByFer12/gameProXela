// controllers/authController.js
const { use } = require('bcrypt/promises');
const pool = require('../config/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.login =async(req,res)=>{
    const{username,password}=req.body;
    try {
        const result=await pool.query('SELECT*FROM sucursales.empleado WHERE username=$1',[username]);
        const user=result.rows[0];
       console.log('Me ESTOY LOGUEANDO...');
        //const otroPass= await bcrypt.hash(password,saltRounds);
        if(user && await bcrypt.compare(password,user.password)){
        
            req.session.userId=user.id_empleado;
            req.session.rol=user.rol;
            req.session.sucursal_id=user.sucursal_id;
            res.status(200).json({message:'Sesion iniciado correctamente',user});
        }else{
            res.status(401).json({message:"Credenciales invalidas"});
        }

    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrar sesión', error: err });
        }

        // Limpiando las cockies
        console.log("CERRANDO SESION");
        res.clearCookie('connect.sid');
        
        res.status(200).json({ message: 'Sesión cerrada correctamente' });
    });
};


