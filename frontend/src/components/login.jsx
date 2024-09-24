import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const datoa=JSON.stringify({ username, password });
  
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }), // Convertir el objeto a JSON

      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user',JSON.stringify(data.user));
       // console.log("Respuesta del servidor: ",data)
        setUser(data.user); // Guardar los datos del usuario logueado, incluyendo el rol
        navigate('/panel');  // Redirigir al panel general
      } else {
        // Si el servidor responde con un código de error, como 401 o 403
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error en la conexión con el servidor');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#343a40' }}>
    <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  </div>
    
  );
};

export default Login;
