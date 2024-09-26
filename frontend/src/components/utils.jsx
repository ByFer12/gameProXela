import { useState } from "react";

export const Info = ({ usuario }) => {


  return (
    <div className="card p-2 bg-secondary mb-4 mt-3">
      <div className="row row-cols-2 ">
        <div className="col mb-1">
          <div className=" border bg-secondary text-center me-3">Nombre</div>
        </div>

        <div className="col mb-1">
          <div className=" border bg-secondary text-center">{usuario.nombre}</div>
        </div>

        <div className="col mb-1">
          <div className=" border bg-secondary text-center me-3" >Rol</div>
        </div>

        <div className="col mb-1 m-auto">
          <div className=" border bg-secondary text-center" style={{ width: "140px" }}>{usuario.rol}</div>
        </div>

        <div className="col mb-1">
          <div className=" border bg-secondary text-center me-3">Sucursal</div>
        </div>

        <div className="col mb-1">
          <div className=" border bg-secondary text-center ">{usuario.rol==="ADMINISTRADOR"? "UNICO":usuario.sucursal_id}</div>
        </div>
      </div>
    </div>
  );
};
