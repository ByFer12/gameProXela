import { useState } from "react";
import TablaClientes from "./tablaClientes";
import axios from "axios";

const RegistroCliente = () => {
  const [check, setCheck] = useState(false);
  const [inpNit, setInpNit] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellidos] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nit, setNit] = useState(null);
  const [clientMos,setClientMos]= useState([]);
  const [mensaje,setMensaje]=useState("");
  const [emv,setEnv]=useState(false);
  const handleChecked = () => {
    setCheck(!check);
    setInpNit(!inpNit);
  };

  const handleNom = (e) => {
    setNombre(e.target.value);
  };
  const handleNit = (e) => {
    setNit(e.target.value);
  };
  const handleApellido = (e) => {
    setApellidos(e.target.value);
  };
  const handleDirec = (e) => {
    setDireccion(e.target.value);
  };
  
  const handleTel = (e) => {
    setTelefono(e.target.value);
  };

  const handleAgregar=async(e)=>{
    e.preventDefault()

    const datos={
      nit,
      nombre,
      apellido,
      direccion,
      telefono
    }
    console.log("Nuevo cliente: ",datos)
    try{
      const registrar= await axios.post("http://localhost:3000/cajero/addClient",datos,{withCredentials: true});

      setMensaje("Cliente agregado correctamente");
      console.log("Cliente Agregado: ",registrar.data);

      setEnv(true);
    }catch(error){
      setMensaje("No se pudo agregar al cliente");
      setMensaje(false);

    }

  }

  return (
    <div>
      <form className="row g-3 ms-5 me-5">
      <h2 className="text-center text-bg-info mt-5 ">Nuevo Cliente</h2>
     
        <div className="col-2 mt-5 mb-2">
          <div className="form-check">
            
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"
              onChange={handleChecked}
            />
            <label className="form-check-label" htmlFor="gridCheck">
              Es Consumidor Final
            </label>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-2">
            <label htmlFor="inputZip" className="form-label">
              NIT
            </label>
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              id="inputZip"
              disabled={inpNit}
              onChange={handleNit}
            />
          </div>
        </div>

        <div className="col-md-4">
          <label htmlFor="inputEmail4" className="form-label">
            Nombres
          </label>
          <input
            type="text"
            className="form-control"
            id="inputEmail4"
            onChange={handleNom}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputPassword4" className="form-label">
            Apellidos
          </label>
          <input
            type="text"
            className="form-control"
            id="inputPassword4"
            onChange={handleApellido}
          />
        </div>
        <hr style={{ width: "0px" }} />
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">
            Direccion
          </label>
          <input type="text" className="form-control" id="inputEmail4" onChange={handleDirec} />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputPassword4" className="form-label">
            Telefono
          </label>
          <input type="text" className="form-control" id="inputPassword4" onChange={handleTel}/>
        </div>

        <div className="col-12">
          <button className="btn btn-info" onClick={handleAgregar}>
            Registrar
          </button>
        </div>
      </form>

      <TablaClientes />
     
      </div>
  );
};

export default RegistroCliente;
