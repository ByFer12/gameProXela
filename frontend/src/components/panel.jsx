import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminActions from "./admin/adminactions";
import { Info } from "./utils";
import "../Panel.css";
import RegistroCliente from "./cajero/registroCliente";
import RegistrarVenta from "./cajero/registrarVenta";

const Panel = ({ user }) => {
  const [selectedOption, setSelectedOption] = useState("home"); // Controlar qué sección mostrar
  const navigate = useNavigate();

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
      return <h2>Hola {user.rol === "ADMINISTRADOR" ? "Admin" : user.rol}</h2>;
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

  return (
    <div className="container-fluid">
      <div className="row ">
        {/* Barra de navegación lateral */}
        <nav className="col-md-4 col-3 d-md-block bg-dark text-light sidebar ">
          <div className="position-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Info usuario={user} />
                <button
                  className="nav-link btn btn-dark text-light m-5"
                  onClick={() => setSelectedOption("home")}
                >
                  <i className="bi bi-house"></i> Inicio
                </button>
              </li>

              {/* Opciones específicas para ADMINISTRADOR */}
              {user.rol === "ADMINISTRADOR" && (
                <>
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-dark text-light"
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
        <main className="col-md-4 ms-sm-auto col-lg-9 px-md-2">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Panel;
