export const Info = ({ usuario }) => {
  return (
    <div className="card p-2 bg-secondary">
      <div className="row row-cols-2 ">
        <div className="col mb-1">
          <div className=" border bg-secondary text-center ">Nombre</div>
        </div>

        <div className="col mb-1">
          <div className=" border bg-secondary text-center">{usuario.nombre}</div>
        </div>

        <div className="col mb-1">
          <div className=" border bg-secondary text-center">Rol</div>
        </div>

        <div className="col mb-1">
          <div className=" border bg-secondary text-center">{usuario.rol}</div>
        </div>

        <div className="col mb-1">
          <div className=" border bg-secondary text-center">Sucursal</div>
        </div>

        <div className="col mb-1">
          <div className=" border bg-secondary text-center">{usuario.rol==="ADMINISTRADOR"? "UNICO":usuario.sucursal_id}</div>
        </div>
      </div>
    </div>
  );
};
