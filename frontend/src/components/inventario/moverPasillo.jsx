import axios from "axios";
import { useEffect, useState } from "react";

const Inventario = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const[pasillo,setPasillo]=useState();

  // Cargar los juegos de`sde la API
  useEffect(() => {
   
      fetchAdditionalGames();

  }, []);



  const fetchAdditionalGames = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/invent/games",
          {
            withCredentials: true, // Enviando cookies o credenciales de sesión
          }
        );
        console.log("JUEGOS TRAIDOS:", response.data);
        setProducts(response.data.productos)
        // Aquí puedes manejar la respuesta, por ejemplo, actualizando un estado:
        // setAdditionalGames(response.data);
      } catch (error) {
        console.error("Error al cargar los juegos adicionales:", error);
      }
    };

  const handleAddProduct = async () => {
    if (!selectedGame || quantity <= 0) {
      alert("Por favor selecciona un juego y una cantidad válida.");
      return;
    }
    console.log("Seleccionado: "+selectedGame)

  
    // Buscar el nombre del juego seleccionado
    const selectedProduct = products.find(
      (game) => game.id === parseInt(selectedGame)
    );
  
    if (!selectedProduct) {
      alert("Error al obtener el juego seleccionado.");
      return;
    }
  
    try {
      // Hacer POST a la API para agregar el producto
      const enviar = await axios.post(
        "http://localhost:3000/bodega/addGame",
        {
          id_producto: selectedProduct.id,
          cantidad: quantity,
          pasillo:pasillo
        },
        {
          withCredentials: true, // Enviar cookies o credenciales de sesión
        }
      );
      fetchAdditionalGames()
      console.log("Producto agregado a pasillo: ", enviar);
      // No se actualiza la tabla ni se llama a fetchProducts
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  };

  // Manejar el cambio en el select del juego
  const handleGameChange = (e) => {
    setSelectedGame(e.target.value);
  };

  // Manejar el cambio en el input de cantidad
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };


  return <>
       <div className="container mt-4">
      <h1 className="mb-4">Agregar Productos A pasiillo</h1>
      
      {/* Fila para el select, input de cantidad y botón */}
      <div className="row mb-4">
        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedGame}
            onChange={handleGameChange}
          >
            <option value="">Selecciona un juego</option>
            {products.map((game, index) => (
              <option key={index} value={game.id}>
                {game.nombre_producto} ---------- Q.{game.precio_producto}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            value={quantity}
            min="1"
            onChange={handleQuantityChange}
            placeholder="Cantidad a agregar"
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            value={pasillo}
            min="1"
            onChange={(e)=>setPasillo(e.target.value)}
            placeholder="Pasillo a agregar"
          />
        </div>
        <div className="col-md-4">
          <button
            className="btn btn-primary"
            onClick={handleAddProduct}
          >
            Agregar a Sucursal
          </button>
        </div>
      </div>

      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad Ingresada</th>
          </tr>
        </thead>
        <tbody>
nonesq
        </tbody>
      </table>
    </div>
  </>;
};

export default Inventario;
