import React from 'react'
import "../components/Eocagregar.css";
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles } from '@material-ui/core';
import { useState } from "react";

const rows=[
  {id:1 ,camera_ip:''             ,camara_name:'PENDIENTE 1'                                                   ,cluster:1,cluster_id_ip:'10.0.130.71'},
  {id:2 ,camera_ip:''             ,camara_name:'PENDIENTE 2'                                                   ,cluster:1,cluster_id_ip:'10.0.130.71'},
  {id:3 ,camera_ip:''             ,camara_name:'PENDIENTE 3'                                                   ,cluster:1,cluster_id_ip:'10.0.130.71'},
  {id:4 ,camera_ip:'172.16.109.52',camara_name:'TL02_AV_LAZARO_CARDENAS_Y_MATAMOROS_CU2-LPR3-3'                ,cluster:1,cluster_id_ip:'10.0.130.71'},
  {id:5 ,camera_ip:'10.167.190.4' ,camara_name:'ZP02_AV_ADOLFO_LOPEZ_MATEOS_Y_AXAYACATL_CU26-LPR1-1'           ,cluster:1,cluster_id_ip:'10.0.130.71'},
  {id:6 ,camera_ip:'10.165.28.5'  ,camara_name:'GU06_AV_JUAN_PABLO_II_Y_CIRCUN_OBLATOS_CU42-LPR4-1'            ,cluster:1,cluster_id_ip:'10.0.130.71'},
  {id:7 ,camera_ip:'10.189.189.4' ,camara_name:'TN05_AV_TONALTECAS_Y_ND_CU40-LPR1-2'                           ,cluster:1,cluster_id_ip:'10.0.130.71'},
  {id:8 ,camera_ip:'10.189.193.3' ,camara_name:'TN06_CAMINO_A_COLIMILLA_Y_PERIFERICO_ORIENTE_CU16-_LPR_1-2'    ,cluster:1,cluster_id_ip:'10.0.130.71'},
  {id:9 ,camera_ip:'10.167.217.4' ,camara_name:'ZP01_PERIFERICO_Y_ARCO_JULIO_CESAR_CU9-LPR3-2'                 ,cluster:1,cluster_id_ip:'10.0.130.71'},
  {id:10,camera_ip:'10.176.63.6'  ,camara_name:'GU010_AV_CRISTOBAL_COLON_Y_CARDENAL_CU51-LPR2-2'               ,cluster:1,cluster_id_ip:'10.0.130.71'},
  {id:11,camera_ip:''             ,camara_name:'PENDIENTE 11'                                                  ,cluster:1,cluster_id_ip:'10.0.130.71'},
  {id:12,camera_ip:'10.165.28.4'  ,camara_name:'GU06_AV_JUAN_PABLO_II_Y_SAN_PEDRO_CU42-LPR1-2'                 ,cluster:1,cluster_id_ip:'10.0.130.71'},
  {id:13,camera_ip:'10.164.182.3' ,camara_name:'ZP04_CARR._GDL-TEPIC_A_TEPIC_BAJA_LPR_5180_2-4'                ,cluster:1,cluster_id_ip:'10.0.130.71'},
  {id:14,camera_ip:'10.199.16.9'  ,camara_name:'ES03_INDUSTRIAL_EL_SALTO_Y_CARRILLO_PUERTO_CU37-LPR2-2'        ,cluster:1,cluster_id_ip:'10.0.130.71'},
  {id:15,camera_ip:'10.173.185.4' ,camara_name:'TL04_AV_LOPEZ_MATEOS_Y_CAMINO_AL_ITESO_CU6-_LPR_2-2'           ,cluster:1,cluster_id_ip:'10.0.130.71'},
  {id:16,camera_ip:''             ,camara_name:'PENDIENTE 12'                                                  ,cluster:2,cluster_id_ip:'10.0.130.72'},
  {id:17,camera_ip:''             ,camara_name:'PENDIENTE 13'                                                  ,cluster:2,cluster_id_ip:'10.0.130.72'},
  {id:18,camera_ip:'172.16.97.71' ,camara_name:'ZP01_PERIFERICO_Y_AV_VALDEPEÑAS_CU9-LPR5-2'                    ,cluster:2,cluster_id_ip:'10.0.130.72'},
  {id:20,camera_ip:'172.17.238.74',camara_name:'GU06_AV_PABLO_VALDEZ_Y_BASILIO_BADILLO_A_PANTEON_DER_1_NVA_LPR',cluster:2,cluster_id_ip:'10.0.130.72'},
];
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 300,
  },
});

export const Eocmodificar = () => {
  const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  return (
    <div className='add'>
      <div className="h3">
        <h2 className='h2'>Eoc Modificar</h2>
        <br/>

        <div id='eoc'>
        <TableContainer className={classes.container}>
              <table className='table table-dark table-hover'>
                <thead>
                  <tr align='center'>
                    <th>id</th>
                    <th>camera_ip</th>
                    <th>camara_name</th>
                    <th>cluster</th>
                    <th>cluster_id_ip</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <tr align='center'>
                      <td>
                        <button className='btn btn-warning'>{row.id}</button></td>
                      <td>{row.camera_ip}</td>
                      <td>{row.camara_name}</td>
                      <td>{row.cluster}</td>
                      <td>{row.cluster_id_ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              id='pagination'
            />
        </div>

        <form id="miFormulario"  >
          <div className="row">
            <div className='col-2'><label htmlFor=""><strong>eoc_siteid:</strong></label></div>
            <div className="col-6">
              <input className="form-control form-control-m text-center" type="search" placeholder='XxxXxxxXXxx0Xxx0x0/XXxXXXXX=' required  />
            </div>
          </div>
        
          <div className="row">
            <div className='col-2'><label htmlFor=""><strong>eoc_sitecertificate:</strong></label></div>
            <div className="col-6">
              <input className="form-control form-control-m text-center" type="search" placeholder='00X00XX0-000X-00XX-XX0X-000XXX0XX000' required  />
            </div>
          </div>

          <div className="row">
            <div className='col-1'>
              <label htmlFor=""><strong>cluster:</strong></label>
            </div>
            <div className="col-1">
              <input className="form-control form-control-m text-center" type="search" min={1} max={256} placeholder='000' required  />
            </div>
            <div className='col-1'></div>
            <div className='col-2'>
            <label htmlFor=""><strong>cluster_id_ip:</strong></label>
            </div>
            <div className="col-2">
                <input className="form-control form-control-m text-center" type="search" placeholder='000.000.000.000' required  />
            </div>
          </div>

          <div className="row">
            <div className="col-2">
              <button className="btn btn-success btn-lg">Guardar Datos</button>
            </div>
            <div className="col-2">
              <button className="btn btn-danger btn-lg">Cancelar</button>
            </div>
          </div>        
        </form>
      </div>          
    </div>
  )
}