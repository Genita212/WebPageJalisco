import React from "react";
import "../components/Adduser.css";
export const Adduser = () => {
    return (
      <div className='add'>
        <div className="h3">
          <h2 className='h2'>Agregar Usuario</h2>
          <br/>
          <form id="miFormulario"  >
            <div className="row">
              <div className='col-2'><label htmlFor=""><strong>Usuario:</strong></label></div>
              <div className="col-6">
                <input className="form-control form-control-lg text-center" type="text" placeholder='user123' required  />
              </div>
            </div>
          
            <div className="row">
              <div className='col-2'><label htmlFor=""><strong>Contraseña:</strong></label></div>
              <div className="col-6">
                <input className="form-control form-control-lg text-center" type="text" placeholder='********' required  />
              </div>
            </div>
  
            <div className="row">
              <div className='col-2'><label htmlFor=""><strong>Permisos EOC:</strong></label></div>
              <div className="col-6">
                <input className="form-control form-control-lg text-center" type="number" min={0} max={1} placeholder='0 or 1' required  />
              </div>
            </div>
  
            <div className="row">
              <div className='col-2'><label htmlFor=""><strong>Permisos agragr usuario(s):</strong></label></div>
              <div className="col-6">
              <input className="form-control form-control-lg text-center" type="number" min={0} max={1} placeholder='0 or 1' required  />
              </div>
            </div>
  
            <div className="row">
              <div className="col-2">
                <button className="btn btn-primary btn-lg">Guardar Datos</button>
              </div>
              <div className="col-2">
                <button className="btn btn-primary btn-lg">Cancelar</button>
              </div>
            </div>        
          </form>
        </div>          
      </div>
    )
  }
