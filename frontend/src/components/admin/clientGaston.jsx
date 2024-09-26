import axios from "axios";
import { useState, useEffect } from "react";

const Clientes = () => {

    const [historial, setHistorial] = useState([]);
    const [error, setError] = useState("");
  
    const obtenerHistorial = async () => {
      try {
          const response = await axios.get("http://localhost:3000/admin/clients", {
              withCredentials: true, // Asegúrate de incluir las credenciales (cookies) de la sesión
            });
  
        console.log("Respuesta CLIENTES: ",response.data.historia)
        setHistorial(response.data.historia);
        setError("");
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Error al obtener el historial de descuentos"
        );
        setHistorial([]);
      }
    };
    useEffect(() => {
        obtenerHistorial();
      }, []);
    return (  
        <>
          <div
          
          className="table-responsive"
          style={{ maxHeight: "300px", overflowY: "auto", marginTop:"80px", marginRight:"100px" }}
        >
            <h1 className="mb-5 text-center">Clientes que mas han gastadoo</h1>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>NIT</th>
                <th>TOTAL GASTADO</th>
                <th>TIPO TARJETA</th>

                
                {/* Otros campos si los tienes */}
              </tr>
            </thead>
            <tbody>
            {historial.length > 0 ? (
                historial.map((item, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{item.nombre}</td>
                    <td>{item.apellido}</td>
                    <td>{item.nit}</td>
                    <td>{item.total_gastado}</td>
                    <td>{item.tipo_tarjeta}</td>
                   
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No hay descuentos en el intervalo dado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </>
    );
}
 
export default Clientes;