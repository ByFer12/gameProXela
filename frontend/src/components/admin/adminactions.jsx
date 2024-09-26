import React, { useState, useEffect } from "react";
import { IoMdNotifications } from "react-icons/io";
import axios from "axios"

const AdminActions = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [role, setRole] = useState('');
  const [caja, setCaja] = useState('');
  const [sucursal, setSucursal] = useState('');


  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/usuarios',        {
          withCredentials: true, // credenciales (cookies) de la sesión
        });
        console.log("Empleados: ",response.data.usuarios)
        setUsuarios(response.data.usuarios);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);



  const handleCreateUser = async (e) => {
    e.preventDefault(); 

    try {
      const newUser = {
        username: username,
        password: password,
        nombre: nombre,
        apellido: apellidos,
        rol: role,
        numero_caja: role === "CAJERO" ? caja : null, // Sólo enviar el número de caja si es "Cajero"
        sucursal_id: sucursal,
      };
      
      const response = await axios.post("http://localhost:3000/admin/register", newUser, {
        withCredentials: true, // Enviando cookies o credenciales de sesión
      });
      setUsuarios(response.data.empleado);
      console.log("Usuario creado:", response.data); // Confirmación de usuario creado
      alert('Usuario creado exitosamente');
      setUsername('');
      setPassword('');
      setNombre('');
      setApellidos('');
      setRole('');
      setCaja('');
      setSucursal('');
      // Opcional: puedes agregar un mensaje de éxito o limpiar el formulario aquí
      alert("Usuario creado exitosamente");
  
    } catch (error) {
      console.error("Error al crear usuario:", error);
      alert("Error al crear usuario");
    }
  };

  return (
    <>
      <div>
        <h1 className="text-center mb-4">Crear Usuario</h1>
        <form onSubmit={handleCreateUser} className="col-md-10">
          <div className="row">
            {/* Nombre */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            {/* Apellidos */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Apellidos</label>
              <input
                type="text"
                className="form-control"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row">
            {/* Nombre de usuario */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Nombre de usuario</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Contraseña */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row">
            {/* Rol */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Rol</label>
              <select
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="CAJERO">Cajero</option>
                <option value="BODEGA">Bodega</option>
                <option value="INVENTARIO">Inventario</option>
              </select>
            </div>

            {/* Caja (solo si es Cajero) */}
            {role=== "CAJERO" && (
              <div className="col-md-6 mb-3">
                <label className="form-label">Número de Caja</label>
                <input
                  type="number"
                  className="form-control"
                  value={caja}
                  onChange={(e) => setCaja(e.target.value)}
                  required={role === "CAJERO"}
                />
              </div>
            )}
          </div>

          <div className="row">
            {/* Sucursal */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Sucursal</label>
              <select
                className="form-control"
                value={sucursal}
                onChange={(e) => setSucursal(e.target.value)}
              >
                <option value="1">Sucursal Parque</option>
                <option value="2">Sucursal Centro1</option>
                <option value="3">Sucursal Centro2</option>
              </select>
            </div>

            {/* Botón Crear Usuario al lado de Sucursal */}
            <div className="col-md-3 mb-3 d-flex align-items-end">
              <button type="submit" className="btn btn-primary w-100">
                Crear Usuario
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Tabla de usuarios */}
      <h3 className="mt-5 text-center">Usuarios Creados</h3>
      <div
        style={{ maxHeight: "370px", overflowY: "scroll", marginTop: "20px" }}
      >
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre </th>
              <th>Apellido</th>
              <th>Username</th>
              <th>Rol</th>
              <th>Caja</th>
              <th>Sucursal</th>
            </tr>
          </thead>
          <tbody>
          {usuarios.length>0?usuarios.map((usuario,index) => (

              <tr key={index}>
                <td>{index+1}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.username}</td>
                <td>{usuario.rol}</td>
                <td>{usuario.numero_caja || 'N/A'}</td>
                <td>{usuario.sucursal_id}</td>
              </tr>
            )):""}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminActions;
