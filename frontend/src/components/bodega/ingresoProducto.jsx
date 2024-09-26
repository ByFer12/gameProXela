import axios from "axios";
import { useEffect, useState } from "react";

const Bodega = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);

  // Cargar los juegos de`sde la API
  useEffect(() => {
   
      fetchAdditionalGames();

    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/bodega/getGames",
        {
          withCredentials: true, // Enviando cookies o credenciales de sesión
        }
      );

      console.log("PRODUCTOOOOS",response.data)
     setGames(response.data); // Asumimos que la API devuelve un array de juegos
    } catch (error) {
      console.error("Error al cargar los juegos:", error);
    }
  };
  const fetchAdditionalGames = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/bodega/games",
          {
            withCredentials: true, // Enviando cookies o credenciales de sesión
          }
        );
        console.log("JUEGOS ADICIONALES:", response.data);
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
  
    // Buscar el nombre del juego seleccionado
    const selectedProduct = games.find(
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
        },
        {
          withCredentials: true, // Enviar cookies o credenciales de sesión
        }
      );
      fetchAdditionalGames()
      console.log("Producto agregado: ", enviar);
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
      <h1 className="mb-4">Bodega - Agregar Productos</h1>
      
      {/* Fila para el select, input de cantidad y botón */}
      <div className="row mb-4">
        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedGame}
            onChange={handleGameChange}
          >
            <option value="">Selecciona un juego</option>
            {games.map((game, index) => (
              <option key={index} value={game.id}>
                {game.nombre} ---------- Q.{game.precio}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            value={quantity}
            min="1"
            onChange={handleQuantityChange}
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

      {/* Tabla para mostrar los productos agregados */}
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad Ingresada</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.nombre_producto}</td>
              <td>{product.precio_producto}</td>
              <td>{product.cantidad_ingresada}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>;
};

export default Bodega;
