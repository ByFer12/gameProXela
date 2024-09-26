const Bienvenida = ({usuario}) => {
    return (  
        <div className="container mt-5">
        <div className="card text-center">
          <div className="card-header bg-primary text-white">
            Bienvenido {usuario.nombre}
          </div>
          <div className="card-body">
            <h5 className="card-title">¡Sos un {usuario.rol}!</h5>
            <p className="card-text">
              Bienvenido a la sucursal numero {usuario.sucursal_id}
            </p>
            <a href="#" className="btn btn-primary">Comenzar</a>
          </div>
          <div className="card-footer text-muted">
            Sistema de Gestión de Ventas
          </div>
        </div>
      </div>
    );
}
 
export default Bienvenida;