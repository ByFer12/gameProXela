import TablaClientes from './tablaClientes';

const RegistroCliente = () => {
  return (
    <div>
    <form className="row g-3 ms-5 me-5">
      <div className="col-2 mt-5 mb-2">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="gridCheck" />
          <label className="form-check-label" htmlFor="gridCheck">
            Es Consumidor Final
          </label>
        </div>
      </div>

      <div className="row align-items-center">
        <div className="col-md-2">
          <label htmlFor="inputZip" className="form-label">
            NIT
          </label>
        </div>
        <div className="col-md-4">
          <input type="number" className="form-control" id="inputZip" />
        </div>
      </div>

      <div className="col-md-4">
        <label htmlFor="inputEmail4" className="form-label">
          Nombres
        </label>
        <input type="text" className="form-control" id="inputEmail4" />
      </div>
      <div className="col-md-4">
        <label htmlFor="inputPassword4" className="form-label">
          Apellidos
        </label>
        <input type="text" className="form-control" id="inputPassword4" />
      </div>
      <hr style={{ width: "0px" }} />
      <div className="col-md-6">
        <label htmlFor="inputEmail4" className="form-label">
          Direccion
        </label>
        <input type="text" className="form-control" id="inputEmail4" />
      </div>
      <div className="col-md-4">
        <label htmlFor="inputPassword4" className="form-label">
          Telefono
        </label>
        <input type="text" className="form-control" id="inputPassword4" />
      </div>

      <div className="col-12">
        <button type="submit" className="btn btn-primary">
          Registrar
        </button>
      </div>
    </form>

   <TablaClientes/>
    </div>
  );
};

export default RegistroCliente;
