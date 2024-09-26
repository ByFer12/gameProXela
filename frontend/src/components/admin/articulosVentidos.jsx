import axios from "axios";
import { useState, useEffect } from "react";

const Articuloss = () => {

    const [historial, setHistorial] = useState([]);
    const [error, setError] = useState("");
  
    const obtenerHistorial = async () => {
      try {
          const response = await axios.get("http://localhost:3000/admin/art", {
              withCredentials: true, // Asegúrate de incluir las credenciales (cookies) de la sesión
            });
  
        console.log("Respuesta ARTICULOS: ",response.data.articulos)
        setHistorial(response.data.articulos);
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
          style={{ maxHeight: "300px", overflowY: "auto", marginTop:"80px" }}
        >
            <h1 className="mb-5 text-center">Sucursales con mas ingresos</h1>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Producto</th>
                <th>Total Vendidos</th>
                
                {/* Otros campos si los tienes */}
              </tr>
            </thead>
            <tbody>
            {historial.length > 0 ? (
                historial.map((item, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{item.producto}</td>
                    <td>{item.total_vendido}</td>
                   
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
 
export default Articuloss;