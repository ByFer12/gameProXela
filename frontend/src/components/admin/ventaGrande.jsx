import axios from "axios";
import { useState } from "react";


const MayorVenta = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [historial, setHistorial] = useState([]);
  const [error, setError] = useState("");

  const obtenerHistorial = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/vents", {
        params: {
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
        },
        withCredentials: true, // Asegúrate de incluir las credenciales (cookies) de la sesión
      });

      console.log("Respuesta: ", response.data);
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

  return (
    <>
      <>
        <div className="container mt-5">
          <h1 className="text-center mb-4">Top 10 de las ventas mas grandes</h1>
          <div className="row mb-4">
            <div className="col-md-5">
              <label htmlFor="fechaInicio" className="form-label">
                Fecha Inicio:
              </label>
              <input
                type="date"
                id="fechaInicio"
                className="form-control"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="fechaFin" className="form-label">
                Fecha Fin:
              </label>
              <input
                type="date"
                id="fechaFin"
                className="form-control"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
              />
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button
                className="btn btn-primary w-100"
                onClick={obtenerHistorial}
              >
                Obtener Historial
              </button>
            </div>
          </div>

          {error && <p className="text-danger text-center">{error}</p>}

          <div
            className="table-responsive"
            style={{ maxHeight: "300px", overflowY: "auto", marginTop: "80px" }}
          >
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>#Factura</th>
                  <th>Cliente</th>
                  <th>NIT</th>
                  <th>Gastado</th>
                  
                  {/* Otros campos si los tienes */}
                </tr>
              </thead>
              <tbody>
              {historial.length > 0 ? (
                historial.map((item, index) => (
                  <tr key={index}>
                    <td>{item.numero_factura}</td>
                    <td>{item.nombre_cliente}</td>
                    <td>{item.nit}</td>
                    <td>Q.{item.total_con_descuento || "N/A"}</td>
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
        </div>
      </>
    </>
  );
};

export default MayorVenta;
