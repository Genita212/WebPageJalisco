import React from 'react';
import "../components/Eocagregar.css";

export const Eocagregar = () => {
  return (
    <div className='add'>
      <div className="h3">
        <h2 className='h2'>Agregar usuario</h2>
        <br/>
        <form id="miFormulario"  >
          <div className="row">
            <div className='col-2'><label htmlFor=""><strong>eoc_siteid:</strong></label></div>
            <div className="col-6">
              <input className="form-control form-control-lg text-center" type="text" placeholder='XxxXxxxXXxx0Xxx0x0/XXxXXXXX=' required  />
            </div>
          </div>
        
          <div className="row">
            <div className='col-2'><label htmlFor=""><strong>eoc_sitecertificate:</strong></label></div>
            <div className="col-6">
              <input className="form-control form-control-lg text-center" type="text" placeholder='00X00XX0-000X-00XX-XX0X-000XXX0XX000' required  />
            </div>
          </div>

          <div className="row">
            <div className='col-2'><label htmlFor=""><strong>cluster:</strong></label></div>
            <div className="col-6">
              <input className="form-control form-control-lg text-center" type="number" min={1} max={256} placeholder='000' required  />
            </div>
          </div>

          <div className="row">
            <div className='col-2'><label htmlFor=""><strong>cluster_id_ip:</strong></label></div>
            <div className="col-6">
              <input className="form-control form-control-lg text-center" type="text" placeholder='000.000.000.000' required  />
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