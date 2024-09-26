import React from "react";
import TotalPagar from "./productos";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../utils.css";

const RegistrarVenta = ({ envUsuario }) => {
  const [esConsumidorFinal, setEsConsumidorFinal] = useState(false);
  const [productos, setProductos] = useState([]);
  const [productoSel, setProductoSel] = useState(null);
  const [productosSeleccionadosMostrar, setProductosSeleccionadosMostrar] =useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const[nueva,setNueva]=useState(false);

  const [numFactura, setNumFactura] = useState("0");
  const [nit, setNit] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [cant, setCantidad] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalDescuento, setTotalDescuento] = useState(0);
  const [precioConDescuento, setPrecioConDescuento] = useState();
  const [otro,setOtro]=useState(false);

  const [cargando, setCargando] = useState(true);
  const cl = cliente ? cliente.nombre + "  " + cliente.apellido : "";

  if(nueva){
    setNueva(!nueva);
    //setproductosSeleccionados([]);
    setEsConsumidorFinal(!esConsumidorFinal)
    setNit(null)
    setNumFactura("0")
    setCantidad(0)
    setCliente(null)


  }
  useEffect(() => {
    console.log("Empleadooooo: ",envUsuario)
    const cargarDatos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/cajero/productStock",
            {
              withCredentials: true, // Asegúrate de incluir las credenciales (cookies) de la sesión
            }
        );
        console.log("Lo que trajo: ", response.data.productos);
        setProductos(response.data.productos);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos(); // Llamar a la función para cargar datos
  }, []);

  const handleChecked = (e) => {
    setEsConsumidorFinal(!esConsumidorFinal);
    setNit(null);
    setCliente(null)
  };


  const handleFact = (e) => {
    setNumFactura(e.target.value);
  };
  const handleNit = (e) => {
    setNit(e.target.value);
    console.log("Editando nit: ", nit);
  };

  const handleClient = (e) => {
    e.preventDefault();
    setOtro(!otro)
    const cargarClient = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/cajero/client/${nit}`,
            {
              withCredentials: true, // Asegúrate de incluir las credenciales (cookies) de la sesión
            }
        );
        console.log("Trajo cliente: ", response.data.client);
        setCliente(response.data.client);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Si el cliente no es encontrado (404)
          console.error("Cliente no encontrado:", error);
          alert("Cliente no encontrado. Verifique el NIT ingresado.");
          setCliente(null); // Para manejar el caso en que no hay cliente
        } else {
          // Otros errores (500, 403, etc.)
          console.error("Error al cargar los datos:", error);
          alert(
            "Ocurrió un error al buscar el cliente. Intente de nuevo más tarde."
          );
        }
      } finally {
        setCargando(false);
      }
    };

    cargarClient();
  };
  const handleSelect = (e) => {
    const idPro = e.target.value;
    if (idPro) {
      const prod = productos.find((p) => p.producto_id === parseInt(idPro));
      setProductoSel(prod);
      console.log(
        "Producto seleccionado: ",
        prod.producto_nombre + " precio " + prod.producto_precio
      );
    } else {
      setProductoSel(null);
    }
  };

  const handleCantidad = (e) => {
    setCantidad(e.target.value);
  };
const handleAdd = (e) => {
    e.preventDefault();
    if (productoSel === null) {
      alert("Debe seleccionar un producto.");
      return;
    }

    if (productoSel.cantidad_disponible < cant) {
      alert(
        "Selecciona otra cantidad, enn existencia hay: " +
          productoSel.cantidad_disponible
      );
      return;
    }

    if (!cant || cant <= 0) {
      alert("Debe ingresar una cantidad válida mayor que 0.");
      return;
    }
    const gast = productoSel.producto_precio * cant;

    //aqui modifico el objeto y agrego nuevo
    const prodAgregar = {
      producto_id: productoSel.producto_id,
      cantidad: parseInt(cant),
      precio_unitario: parseFloat(productoSel.producto_precio),
      gastado: parseInt(gast)
    };
    const prodMostrar = {
      producto_nom: productoSel.producto_nombre,
      cantidad: cant,
      precio: productoSel.producto_precio,
      gastado: gast,
    };

    // Actualiza el estado de productosSeleccionadosMostrar
    setProductosSeleccionadosMostrar((prevProductos) => [
      ...prevProductos,
      prodMostrar,
    ]);

    // Actualiza el estado de productosSeleccionados
    setProductosSeleccionados((prevProductos) => [
      ...prevProductos,
      prodAgregar,
    ]);

    const otro = total + prodMostrar.precio * cant;
    let des=0;
    setTotal(otro);
    const tipoTarjeta =cliente?cliente.tipo_tarjeta:null;

    if (tipoTarjeta !== null) {
     
      const calcularPuntosGanados = (otro, tipoTarjeta) => {
        let puntosGanados = 0.0;
        if (tipoTarjeta === "COMUN") {
          puntosGanados = Math.floor(otro / 200) * 5;
        } else if (tipoTarjeta === "ORO") {
          puntosGanados = Math.floor(otro / 200) * 10;
        } else if (tipoTarjeta === "PLATINO") {
          puntosGanados = Math.floor(otro / 200) * 20;
        } else if (tipoTarjeta === "DIAMANTE") {
          puntosGanados = Math.floor(otro / 200) * 30;
        }
        return puntosGanados;
      };

      const calc = calcularPuntosGanados(otro, tipoTarjeta);
       des =  calc;

      setTotalDescuento(des);
      
    }
    setPrecioConDescuento(otro - des);

   

    console.log("Arreglo a mostrar: ", productosSeleccionadosMostrar);
  };

  return (
    <div>
      <form className="row g-5 m-2">
        <div className="col-5 ">
          <h3 className="form-check-label">Numero de Factura</h3>
        </div>
        <div className="col-md-2">
          <input type="number" className="form-control" onChange={handleFact} />
        </div>
        <div className="col-md-4"></div>
        <div className="col-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={esConsumidorFinal}
              onChange={handleChecked}
            />
            <label className="form-check-label" htmlFor="gridCheck">
              Es Consumidor Final
            </label>
          </div>
        </div>
        <div className="col-md-2">
          <label htmlFor="inputEmail4" className="form-label">
            NIT
          </label>
          <input
            type="number"
            className="form-control"
            disabled={esConsumidorFinal||otro}
            onChange={handleNit}
          />
        </div>
        <div className="col-md-2 mt-5 display-6">
          <button
            type="submit"
            className="btn btn-primary axios"
            onClick={handleClient}
          >
            Buscar
          </button>
        </div>
        <div className="col-md-4">
          <label htmlFor="inputPassword4" className="form-label">
            Cliente
          </label>
          <input type="text" className="form-control" disabled value={cl} />
        </div>
        <div className="col-md-5">
          <label htmlFor="inputState" className="form-label">
            Producto
          </label>
          {cargando ? ( // Mostrar carga mientras se obtienen los datos
            <p>Cargando opciones...</p>
          ) : (
            <select className="form-select" onChange={handleSelect} required>
              <option value="">----Seleccionar----</option>
              {productos.map(
                (
                  opcion // Mapear las opciones al select
                ) => (
                  <option key={opcion.producto_id} value={opcion.producto_id}>
                    {opcion.producto_nombre} ---------------- Q.
                    {opcion.producto_precio}
                  </option>
                )
              )}
            </select>
          )}
        </div>
        <div className="col-md-2">
          <label htmlFor="inputPassword4" className="form-label" required>
            Cantidad
          </label>
          <input
            type="number"
            className="form-control"
            onChange={handleCantidad}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="inputPassword4" className="form-label" required>
            Disponible
          </label>
          <input
            type="number"
            className="form-control"
            value={productoSel ? productoSel.cantidad_disponible : ""}
            disabled
          />
        </div>
        <div className="col-2 display-6 mt-5">
          <button className="btn btn-primary " onClick={handleAdd}>
            Agregar
          </button>
          <button className="btn btn-primary axios" onClick={handleAdd}>
            Nueva venta
          </button>
        </div>
      </form>
      <TotalPagar
        prods={productosSeleccionadosMostrar}
        prec={total}
        descu={precioConDescuento}
        puntos={totalDescuento}
        cf={esConsumidorFinal}
        fac={numFactura}
        ni={nit}
        id_empleado={envUsuario.id_empleado}
        sucursal={envUsuario.sucursal_id}
        productosss={productosSeleccionados}
        estado={setNueva}
        ne={nueva}

      />
    </div>
  );
};

export default RegistrarVenta;

/*






 


 */