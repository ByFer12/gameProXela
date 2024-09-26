import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import AdminActions from "./admin/adminactions";
import { Info } from "./utils";
import "../Panel.css";
import RegistroCliente from "./cajero/registroCliente";
import RegistrarVenta from "./cajero/registrarVenta";
import Bienvenida from "../saludo";
import { IoMdNotifications } from "react-icons/io";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const Panel = ({ user }) => {
  const [noti,setNoti]=useState([]);
  const[notiTar,setNotiTar]=useState([]);
  const [show, setShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState("home"); // Controlar qué sección mostrar
  const navigate = useNavigate();
  const [titulo,setTitle]=useState("");

  const handleLogout = async () => {
    try {
      // Enviar solicitud de cierre de sesión al backend
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include", // Incluye las cookies en la solicitud
      });

      if (response.ok) {
        // Eliminar el usuario del localStorage o sessionStorage
        localStorage.removeItem("user"); // Usa sessionStorage.removeItem('user') si estás usando sessionStorag

        // Redirigir al login
        navigate("/");
      } else {
        // Manejo de errores
        console.error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error al enviar solicitud de cierre de sesión", error);
    }
  };

  const renderContent = () => {
    if (selectedOption === "home") {
      return<Bienvenida usuario={user}/>;
    }
    if (selectedOption === "create-user" && user.rol === "ADMINISTRADOR") {
      return <AdminActions />;
    }
    if (selectedOption === "ventas" && user.rol === "CAJERO") {
      return <RegistrarVenta  envUsuario={user} />;
    }
    if (selectedOption === "regClientes" && user.rol === "CAJERO") {
      return <RegistroCliente />;
    }
    return <h2>Bienvenido {user.rol}</h2>;
  };
  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true); setTitle("Aprobar edicion de clientes")}


  if(user.rol==="ADMINISTRADOR"){
  useEffect((e) => {
   
    const cargarDatos = async () => {
      try {
        const notificaciones = await axios.get(
          "http://localhost:3000/admin/soliEdith",
          {
            withCredentials: true, // Asegúrate de incluir las credenciales (cookies) de la sesión
          }
        );
        console.log("Trayendo Editar usuario: ", notificaciones.data.sol);
        setNoti(notificaciones.data.sol);
      } catch (error) {
        console.log(error);
      }
    };
    const cargarTarjetas = async () => {
      try {
        const notificaciones = await axios.get(
          "http://localhost:3000/admin/soliTar",
          {
            withCredentials: true, // Asegúrate de incluir las credenciales (cookies) de la sesión
          }
        );
        console.log("Trayendo Editar usuario: ", notificaciones.data.sol);
        setNotiTar(notificaciones.data.sol);
      } catch (error) {
        console.log(error);
      }
    };
    cargarTarjetas()
    cargarDatos();

    console.log("Datos ", noti.sol);
  }, []);

}
const handleEnvio=async(nit,nombre, apellido,direccion,telefono,id)=>{
    console.log("Nit: "+nit+" nombre: "+nombre+" apellido: "+apellido+" direccion: "+direccion+" telefono: "+telefono)
  const datos={
    nit,
    nombre,
    apellido,
    direccion,
    telefono,
    id
  }

  try {
    const clientEdit=await axios.post('http://localhost:3000/admin/eClient',datos,{ withCredentials: true });

    alert("Cliente: "+nombre+" Editado correctamente")
    setShow(false);
    console.log("Editado: ",clientEdit.data)
    
  } catch (error) {
    console.log("Error: "+error)
  }
  setNoti((prevNoti) => prevNoti.filter((tarea) => tarea.id !== id));


}
  return (
    <>
    <div className="container-fluid">
      <div className="row ">
        {/* Barra de navegación lateral */}
        <nav className="col-md-4 col-3 d-md-block bg-dark text-light sidebar ">
          <div className="position-sticky">
            <ul className="nav flex-column">


              {/* Opciones específicas para ADMINISTRADOR */}
              {user.rol === "ADMINISTRADOR" && (
                <>
                  
                  <li>
                  <a className="text-center non m-3 text-decoration-none text-white" role="button" onClick={handleShow}>
                   Clientes 
                  <IoMdNotifications style={{color: 'yellow', fontSize: '40px'}}/>
                  {noti.length > 0 ? noti.length : "0"}
                  
                  </a>
                </li>
                <li>
                <a className="text-center non m-3 text-decoration-none text-white" role="button" onClick={handleShow}>
                   Tarjetas
                  <IoMdNotifications style={{color: 'yellow', fontSize: '40px'}}/>
                  12
                </a>
                </li>
                <Info usuario={user} />
                <button
                  className="nav-link btn btn-dark text-light m-3"
                  onClick={() => setSelectedOption("home")}
                >
                  <i className="bi bi-house"></i> Inicio
                </button>

                  <li className="nav-item">

                
                    <button
                      className="m-3 nav-link btn btn-dark text-light"
                      onClick={() => setSelectedOption("create-user")}
                    >
                      <i className="bi bi-person-plus"></i> Crear Usuario
                    </button>
                  </li>
                </>
              )}

              {/* Opciones específicas para CAJERO */}
              {user.rol === "CAJERO" && (
                <>
                                <Info usuario={user} />
                <button
                  className="nav-link btn btn-dark text-light m-5"
                  onClick={() => setSelectedOption("home")}
                >
                  <i className="bi bi-house"></i> Inicio
                </button>
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-dark text-light m-5"
                      onClick={() => setSelectedOption("ventas")}
                    >
                      <i className="bi bi-cart"></i> Registrar Ventas
                    </button>
                    <button
                      className="nav-link btn btn-dark text-light m-5"
                      onClick={() => setSelectedOption("regClientes")}
                    >
                      <i className="bi bi-cart"></i> Registrar clientes
                    </button>


                  </li>
                </>
              )}
              <div className="mt-5">

              </div>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-danger text-light m-5"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right"></i> Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* Contenido de la derecha */}
        <main className=" ms-sm-auto col-lg-9 px-md-2">
          {renderContent()}
        </main>
      </div>
    </div>
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {noti.length > 0 ? (
            <ul className="list-group">
              {noti.map((tarea) => (
                <li key={tarea.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{tarea.nombre}</strong>
                  </div>
                  <Button variant="success" size="sm" onClick={()=>handleEnvio(tarea.nit,tarea.nombre,tarea.apellido,tarea.direccion,tarea.telefono,tarea.id)}>
                    Aceptar
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay tareas pendientes</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>

      </Modal>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {noti.length > 0 ? (
            <ul className="list-group">
              {notiTar.map((tarea) => (
                <li key={tarea.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>El cliente {tarea.nombre_cliente} ya puede adquirir la tarjeta {tarea.tipo_tarjeta}</strong>
                  </div>
                  <Button variant="success" size="sm" onClick={()=>handleEnvio(tarea.nit,tarea.nombre,tarea.apellido,tarea.direccion,tarea.telefono,tarea.id)}>
                    Aceptar
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay tareas pendientes</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Panel;
