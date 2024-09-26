import axios from "axios";
import "../../Productos.css";
import { useState } from "react";
const TotalPagar = ({
  prods,
  prec,
  descu,
  puntos,
  cf,
  fac,
  ni,
  id_empleado,
  sucursal,
  productosss,
  estado,
  ne
}) => {
  const [mensaje, setMensaje] = useState("");
  const [vendido, setVendido] = useState(false);
  const [comptado, setComprado] = useState(false);

  const handleEnvioVenta = async (e) => {
    e.preventDefault();

    estado(!ne)
    const datos = {
      esConsumidorFinal: cf,
      puntosGanados: puntos,
      numero_factura: fac,
      nit: ni,
      empleado_id: id_empleado,
      sucursal_id: sucursal,
      total_sin_descuento: prec,
      total_con_descuento: descu,
      productos: productosss,
    };

    console.log("Fatos", datos);

    try {
      const vender = await axios.post(
        "http://localhost:3000/cajero/venta",
        datos,
        { withCredentials: true }
      );
      setMensaje("Venta registrada correctamente");
      setVendido(true);
      console.log("Venta registrada: " + vender.data);
    } catch (error) {
      setMensaje("Error al registrar la venta");
      setVendido(false);
      console.error(error);
    }
  };

  return (
    <div className="contenedor container my-5 ">
      {vendido ? (
        <div className="alert alert-success" role="alert">
          {mensaje}
        </div>
      ) : (
        <div className="alert alert-danger" role="alert">
          {mensaje}
        </div>
      )}
      <div className="card">
        <div className="card-header text-lg-center">
          <h3>Productos a comprar</h3>
        </div>
        <div className="card-body tab-wrapper">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {prods.map((producto, index) => (
                <tr key={index}>
                  <td>{producto.producto_nom}</td>
                  <td>Q.{producto.precio}</td>
                  <td>{producto.cantidad}</td>
                  <td>Q.{producto.gastado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Total sin descuento</th>
              <th>Total con descuento</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h3>Q.{prec}</h3>
              </td>
              <td>
                <h3>Q.{descu}</h3>
              </td>

              <td>
                {" "}
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={handleEnvioVenta}
                >
                  <h4>Comprar</h4>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TotalPagar;
