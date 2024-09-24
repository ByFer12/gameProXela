import '../../Table.css'
const TablaClientes = () => {
    return ( 
        <div className="contenedor container my-5 ">
        <div className="card">
          <div className="card-header text-lg-center">
            <h3>Tabla Clientes</h3>
          </div>
          <div className="card-body table-wrapper">
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
                  <td>5</td>
                  <td>Chris Johnson</td>
                  <td>chris@example.com</td>
                  <td>555-9876</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Alice Lee</td>
                  <td>alice@example.com</td>
                  <td>555-4567</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Mark Evans</td>
                  <td>mark@example.com</td>
                  <td>555-6543</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>Emma Clark</td>
                  <td>emma@example.com</td>
                  <td>555-3210</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>Daniel White</td>
                  <td>daniel@example.com</td>
                  <td>555-7890</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>Olivia Martinez</td>
                  <td>olivia@example.com</td>
                  <td>555-6789</td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>Lucas King</td>
                  <td>lucas@example.com</td>
                  <td>555-5432</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>Grace Adams</td>
 
                  <td>555-1239</td>
                </tr>
              </tbody>
            
            </table>

          </div>
        </div>
      </div>
      
     );
}
 
export default TablaClientes;