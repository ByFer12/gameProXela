import axios from "axios";
import "../../Table.css";
import { useState, useEffect ,useRef} from "react";

const TablaClientes = () => {
  const [datos, setDatos] = useState();
  const [nit, setNit] = useState();
  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [direccion, setDireccion] = useState();
  const [telefono, setTelefono] = useState();
  const modalRef = useRef(null);
  const openModal = (nit, nombre, apellido, direccion, telefono) => {
    setNit(nit);
    setNombre(nombre);
    setApellido(apellido);
    setDireccion(direccion);
    setTelefono(telefono);
  };
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const clientes = await axios.get(
          "http://localhost:3000/cajero/clients",
          {
            withCredentials: true, // Asegúrate de incluir las credenciales (cookies) de la sesión
          }
        );
        console.log("Trayendo clientes: ", clientes.data.clients);
        setDatos(clientes.data.clients);
      } catch (error) {
        console.log(error);
      }
    };
    cargarDatos();

    console.log("Datos ", datos);
  }, []);

  const handleEditar=async(e)=>{
    e.preventDefault()

    const datos={
      nit,
      nombre,
      apellido,
      direccion,
      telefono
    }

    try {
      const editar=await axios.post('http://localhost:3000/cajero/editClient',datos,    {
        withCredentials: true, // Asegúrate de incluir las credenciales (cookies) de la sesión
      })  
      
      console.log('Solicitud enviada: ',editar.data)
      setTimeout(() => {
        // Obtener el modal a través de la referencia y cerrar el modal usando los métodos nativos de Bootstrap
        const modalElement = document.getElementById("editUserModal");
        const modalBootstrap = bootstrap.Modal.getInstance(modalElement);
        modalBootstrap.hide();
      }, 1); 
    } catch (error) {

      console.log("Error: ",error)
      
    }
  }

  return (
    <div>
      <div className="contenedor container my-5 ">
        <div className="card">
          <div className="card-header text-lg-center">
            <h3>CLIENTES REGISTRADOS</h3>
          </div>
          <div className="card-body table-wrapper">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>NIT</th>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>Direcion</th>
                  <th>Telefono</th>
                  <th>EDITAR</th>
                </tr>
              </thead>
              <tbody>
                {datos ? (
                  datos.map((cliente, index) => (
                    <tr key={index}>
                      <td>{cliente.nit}</td>
                      <td>{cliente.nombre}</td>
                      <td>{cliente.apellido}</td>
                      <td>{cliente.direccion}</td>
                      <td>{cliente.telefono}</td>
                      <td>
                        <button
                          className="btn btn-info"
                          data-bs-toggle="modal"
                          data-bs-target="#editUserModal"
                          onClick={()=>openModal(cliente.nit,cliente.nombre,cliente.apellido,cliente.direccion,cliente.telefono)}
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="editUserModal"
        tabindex="-1"
        aria-labelledby="editUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editUserModalLabel">
                Editar Usuario
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="editUserForm">
                <div className="mb-3">
                  <label htmlFor="nit" className="form-label">
                    NIT
                  </label>
                  <input
                    type="text"
                    className="form-control text-bg-secondary"
                    id="nit"
                    name="nit"
                    required
                    value={nit}
                    onChange={(e)=>setNit(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control text-bg-secondary"
                    id="nombre"
                    name="nombre"
                    required
                    value={nombre}
                    onChange={(e)=>setNombre(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="apellido" className="form-label">
                    Apellido
                  </label>
                  <input
                    type="text"
                    className="form-control text-bg-secondary"
                    id="apellido"
                    name="apellido"
                    required
                    value={apellido}
                    onChange={(e)=>setApellido(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="direccion" className="form-label">
                    Dirección
                  </label>
                  <input
                    type="text"
                    className="form-control text-bg-secondary"
                    id="direccion"
                    name="direccion"
                    required
                    value={direccion}
                    onChange={(e)=>setDireccion(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    className="form-control text-bg-secondary"
                    id="telefono"
                    name="telefono"
                    required
                    value={telefono}
                    onChange={(e)=>setTelefono(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                form="editUserForm"
                onClick={handleEditar}
              >
                Solicitar edicion
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaClientes;
