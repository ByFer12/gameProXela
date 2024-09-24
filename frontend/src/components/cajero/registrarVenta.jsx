import React from "react";
import TotalPagar from "./productos";
import {useEffect, useState} from 'react'
import axios from 'axios'

const RegistrarVenta = ({envUsuario}) => {

  const [esConsumidorFinal, setEsConsumidorFinal]= useState(false);
  const [productos, setProductos]= useState([])
  const productosSeleccionados=[];
  const [numFactura, setNumFactura]=useState(0);
  const [nit, setNit]=useState();
  const [cliente, setCliente]=useState(null);
  const [product, setProduct]=useState(null);
  const [cantidad, setCantidad]=useState(0);
  const [total, setTotal]=useState(0);
  const [totalDescuento,setTotalDescuento]=useState(0);

  const [cargando, setCargando] = useState(true);
  

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cajero/productStock', {
          withCredentials: true, // Asegúrate de incluir las credenciales (cookies) de la sesión
        });
        console.log("Lo que trajo: ", response.data.productos);
        setProductos(response.data.productos);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos(); // Llamar a la función para cargar datos
  }, []);

  const handleChecked=(e)=>{
    setEsConsumidorFinal(!esConsumidorFinal);
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(esConsumidorFinal){
      
      console.log("Si es un puto consumidor final")
    }else{
      console.log('No es un pinche consumidor final')
    }
  }
  const handleFact=(e)=>{
    setNumFactura(e.target.value)

  }
  const handleNit=(e)=>{
 
    setNit(e.target.value);
    console.log("Editando nit: ",nit)
  }

  const handleClient=(e)=>{
    e.preventDefault()
    const cargarClient = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/cajero/client/${nit}`, {
          withCredentials: true, // Asegúrate de incluir las credenciales (cookies) de la sesión
        });
        console.log("Trajo cliente: ", response.data.client);
        setCliente(response.data.client);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarClient();
  }


  return (
    <div>
    <form className="row g-5 m-2">
      <div className="col-5 ">
          <h3 className="form-check-label">
            Numero de Factura
          </h3>
      </div>
      <div className="col-md-2">
        <input type="number" className="form-control" onChange={handleFact}  />
      </div>
      <div className="col-md-4"></div>
      <div className="col-2">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" checked={esConsumidorFinal}  onChange={handleChecked}  />
          <label className="form-check-label" htmlFor="gridCheck">
            Es Consumidor Final
          </label>
        </div>
      </div>
      <div className="col-md-2">
        <label htmlFor="inputEmail4" className="form-label">
          NIT
        </label>
        <input type="number" className="form-control" disabled={esConsumidorFinal} onChange={handleNit} />
      </div>
      <div className="col-md-2 mt-5 display-6">
        <button type="submit" className="btn btn-primary" onClick={handleClient}>
          Buscar
        </button>
      </div>
      <div className="col-md-4">
        <label htmlFor="inputPassword4" className="form-label">
          Cliente
        </label>
        <input type="text" className="form-control" disabled  />
      </div>
      <div className="col-md-5">
        <label htmlFor="inputState" className="form-label">
          Producto
        </label>
        {cargando ? ( // Mostrar carga mientras se obtienen los datos
                <p>Cargando opciones...</p>
            ) : (
                <select className="form-select">
                   
                    {productos.map(opcion => ( // Mapear las opciones al select
                        <option key={opcion.producto_id} value={opcion}>
                            {opcion.producto_nombre}  ----------------     Q.{opcion.producto_precio}
                        </option>
                    ))}
                </select>
            )}
      </div>
      <div className="col-md-2 me-5">
        <label htmlFor="inputPassword4" className="form-label">
          Cantidad
        </label>
        <input type="number" className="form-control"  />
      </div>
      <div className="col-md-2 ms-5">
        <label htmlFor="inputPassword4" className="form-label">
          Disponible en Stock
        </label>
        <input type="number" className="form-control"  disabled />
      </div>

      <div className="col-12">
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Agregar
        </button>
      </div>
    </form>
    <TotalPagar/>
    </div>
  );
};

export default RegistrarVenta;
