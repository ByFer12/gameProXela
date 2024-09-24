import React, { useState } from 'react';

const AdminActions = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('CAJERO');

  const handleCreateUser = (e) => {
    e.preventDefault();
    // Lógica para crear un usuario
    alert(`Usuario ${username} con rol ${role} creado.`);
  };

  return (
    <div>
      <h2>Crear Usuario</h2>
      <form onSubmit={handleCreateUser}>
        <div className="m-5">
          <label className="form-label">Nombre de usuario</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="m-5">
          <label className="form-label">Rol</label>
          <select
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="CAJERO">Cajero</option>
            <option value="BODEGA">Bodega</option>
            <option value="INVENTARIO">Inventario</option>
            <option value="ADMINISTRADOR">Administrador</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary m-5">Crear Usuario</button>
      </form>
    </div>
  );
};

export default AdminActions;
