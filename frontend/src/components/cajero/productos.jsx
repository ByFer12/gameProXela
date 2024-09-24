import '../../Productos.css'
const TotalPagar = () => {
    return ( 
        <div className="contenedor container my-5 ">
        <div className="card">
          <div className="card-header text-lg-center">
            <h3>Productos a comprar</h3>
          </div>
          <div className="card-body tab-wrapper">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>John Doe</td>
                  <td>john@example.com</td>
                  <td>555-1234</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jane Smith</td>
                  <td>jane@example.com</td>
                  <td>555-5678</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Michael Brown</td>
                  <td>michael@example.com</td>
                  <td>555-4321</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Sarah Wilson</td>
                  <td>sarah@example.com</td>
                  <td>555-8765</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Sarah Wilson</td>
                  <td>sarah@example.com</td>
                  <td>555-8765</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Sarah Wilson</td>
                  <td>sarah@example.com</td>
                  <td>555-8765</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Sarah Wilson</td>
                  <td>sarah@example.com</td>
                  <td>555-8765</td>
                </tr>
              
              </tbody>
            
            </table>

          </div>
          <table className="table table-bordered table-hover">
              <thead>
                <tr>
  
                  <th>Productos</th>
                  <th>Total sin descuento</th>
                  <th>Total con descuento</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Halo Reach</td>
                  <td>1558.45</td>
                  <td>1440.78</td>
                  <td>        <button type="submit" className="btn btn-success">
          Comprar
        </button></td>
                  
                </tr>
              </tbody>

          </table>
        </div>
      </div>
      
     );
}
 
export default TotalPagar;