import React, {useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login";
import Panel from "./components/panel";

function App() {

  const [user, setUser] = useState(null);
  //const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Recuperar del localStorage
    } else {
      //navigate('/login'); // Redirigir al login si no hay usuario
    }
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          {user && <Route path="/panel" element={<Panel user={user} />} />}
          {/* Si no hay usuario logueado, redirigir a login */}
          {!user && <Route path="*" element={<Login setUser={setUser} />} />}
        </Routes>
      </Router>
    </>
  );
}

export default App;
