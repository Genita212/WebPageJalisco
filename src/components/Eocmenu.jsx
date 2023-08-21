import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import{Eocagregar} from '../components/Eocagregar';
import{Eocmodificar} from '../components/Eocmodificar';
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import ReactModal from 'react-modal';

import "../components/Eocmenu.css";
import { Adduser } from './Adduser';
// datos de la tabla general
const grows=[
  {id:1 ,camera_ip:''             ,stream_ur:''                                              ,camara_name:'PENDIENTE 1'                                                   ,cluster:1,lat:''         ,long:''          ,eoc_siteid:'03f19bc1-941f-46db-af7e-824fbc1fe592',eoc_sitecertificate:'ZglGtbdGQuz9Gwp5o2/AVgNDCZI=',cluster_id_ip:'10.0.130.71'},
  {id:2 ,camera_ip:''             ,stream_ur:''                                              ,camara_name:'PENDIENTE 2'                                                   ,cluster:1,lat:''         ,long:''          ,eoc_siteid:'04111138-51d8-4e94-8363-eba6a511fcc1',eoc_sitecertificate:'+snIWBcPaGpQiqdZ2OlrbvzwXeQ=',cluster_id_ip:'10.0.130.71'},
  {id:3 ,camera_ip:''             ,stream_ur:''                                              ,camara_name:'PENDIENTE 3'                                                   ,cluster:1,lat:''         ,long:''          ,eoc_siteid:'1857f3a5-323a-4f3e-ab66-842d91287141',eoc_sitecertificate:'BSE+xRASvZVr24Qyy11W7ze1BYg=',cluster_id_ip:'10.0.130.71'},
  {id:4 ,camera_ip:'172.16.109.52',stream_ur:'rtsp://service:Service.1@172.16.109.52/?inst=1',camara_name:'TL02_AV_LAZARO_CARDENAS_Y_MATAMOROS_CU2-LPR3-3'                ,cluster:1,lat:'20.62342' ,long:'-103.31474',eoc_siteid:'3585fac7-0854-481e-8882-ce75d285bd57',eoc_sitecertificate:'llRRs1AqSs9cQQK1o3RMKl1AGJk=',cluster_id_ip:'10.0.130.71'},
  {id:5 ,camera_ip:'10.167.190.4' ,stream_ur:'rtsp://service:Service.1@10.167.190.4/?inst=1' ,camara_name:'ZP02_AV_ADOLFO_LOPEZ_MATEOS_Y_AXAYACATL_CU26-LPR1-1'           ,cluster:1,lat:'20.64972' ,long:'-103.40386',eoc_siteid:'43535f16-fea2-406d-ae6b-6e184f593c3c',eoc_sitecertificate:'ZRsqSYXEBwM2oLglbmZ47YJa+gY=',cluster_id_ip:'10.0.130.71'},
  {id:6 ,camera_ip:'10.165.28.5'  ,stream_ur:'rtsp://service:Service.1@10.165.28.5/?inst=1'  ,camara_name:'GU06_AV_JUAN_PABLO_II_Y_CIRCUN_OBLATOS_CU42-LPR4-1'            ,cluster:1,lat:'20.69179' ,long:'-103.31111',eoc_siteid:'67de4f5a-9508-4f7b-9b7f-6b411183ea7f',eoc_sitecertificate:'slNIEVWh3d0hh6V152DI3YTGUH0=',cluster_id_ip:'10.0.130.71'},
  {id:7 ,camera_ip:'10.189.189.4' ,stream_ur:'rtsp://service:Service.1@10.189.189.4/?inst=1' ,camara_name:'TN05_AV_TONALTECAS_Y_ND_CU40-LPR1-2'                           ,cluster:1,lat:'20.65682' ,long:'-103.23338',eoc_siteid:'97b0be31-3f6e-4522-a0e7-ff66837739d3',eoc_sitecertificate:'M9eG2eG1AN3M94tZmWiPSSl4GjM=',cluster_id_ip:'10.0.130.71'},
  {id:8 ,camera_ip:'10.189.193.3' ,stream_ur:'rtsp://service:Service.1@10.189.193.3/?inst=1' ,camara_name:'TN06_CAMINO_A_COLIMILLA_Y_PERIFERICO_ORIENTE_CU16-_LPR_1-2'    ,cluster:1,lat:'20.68492' ,long:'-103.24487',eoc_siteid:'9B6D3B42-6528-4E05-A5E8-BF6EF53FC50A',eoc_sitecertificate:'BIK6k7/Y2RS8lIktWOqAeU26dp4=',cluster_id_ip:'10.0.130.71'},
  {id:9 ,camera_ip:'10.167.217.4' ,stream_ur:'rtsp://service:Service.1@10.167.217.4/?inst=1' ,camara_name:'ZP01_PERIFERICO_Y_ARCO_JULIO_CESAR_CU9-LPR3-2'                 ,cluster:1,lat:'20.7356'  ,long:'-103.40709',eoc_siteid:'a599920d-5b7f-4638-82a4-c4bca854f34b',eoc_sitecertificate:'+0PaKMBUcxt/k49Cx+Bh4/GJWpc=',cluster_id_ip:'10.0.130.71'},
  {id:10,camera_ip:'10.176.63.6'  ,stream_ur:'rtsp://service:Service.1@10.176.63.6/?inst=1'  ,camara_name:'GU010_AV_CRISTOBAL_COLON_Y_CARDENAL_CU51-LPR2-2'               ,cluster:1,lat:'20.65721' ,long:'-103.36117',eoc_siteid:'CC442AA8-D3D3-403C-9785-611FDF0935FA',eoc_sitecertificate:'Dniu9hGJrEc3CRYimO5jTixtwRA=',cluster_id_ip:'10.0.130.71'},
  {id:11,camera_ip:''             ,stream_ur:''                                              ,camara_name:'PENDIENTE 11'                                                  ,cluster:1,lat:''         ,long:''          ,eoc_siteid:'3be430ae-f59f-4b89-a32f-807e3319b2fb',eoc_sitecertificate:'aBy2TOXD7S+DZdSJ0HHqGEJMNeE=',cluster_id_ip:'10.0.130.71'},
  {id:12,camera_ip:'10.165.28.4'  ,stream_ur:'rtsp://service:Service.1@10.165.28.4/?inst=1'  ,camara_name:'GU06_AV_JUAN_PABLO_II_Y_SAN_PEDRO_CU42-LPR1-2'                 ,cluster:1,lat:'20.69152' ,long:'-103.31141',eoc_siteid:'488f5bb0-5687-4363-ac20-06d8243a5f3b',eoc_sitecertificate:'SdFoh/TVmZ7WlGVNSV1sk5OEo+k=',cluster_id_ip:'10.0.130.71'},
  {id:13,camera_ip:'10.164.182.3' ,stream_ur:'rtsp://service:Service.1@10.164.182.3/?inst=1' ,camara_name:'ZP04_CARR._GDL-TEPIC_A_TEPIC_BAJA_LPR_5180_2-4'                ,cluster:1,lat:'20.729914',long:'-103.53565',eoc_siteid:'632f207d-b86b-49be-9977-bbca4daebace',eoc_sitecertificate:'Ec8S+vQYuWKJMO+J9Mi2VLgXJdc=',cluster_id_ip:'10.0.130.71'},
  {id:14,camera_ip:'10.199.16.9'  ,stream_ur:'rtsp://service:Service.1@10.199.16.9/?inst=1'  ,camara_name:'ES03_INDUSTRIAL_EL_SALTO_Y_CARRILLO_PUERTO_CU37-LPR2-2'        ,cluster:1,lat:'20.56219' ,long:'-103.2858' ,eoc_siteid:'73f082fb-8e57-4c66-87ba-10e53dbb4612',eoc_sitecertificate:'iAnG50HXzHwXz/hufAi57gjAfhE=',cluster_id_ip:'10.0.130.71'},
  {id:15,camera_ip:'10.173.185.4' ,stream_ur:'rtsp://service:Service.1@10.173.185.4/?inst=1' ,camara_name:'TL04_AV_LOPEZ_MATEOS_Y_CAMINO_AL_ITESO_CU6-_LPR_2-2'           ,cluster:1,lat:'20.61858' ,long:'-103.4243' ,eoc_siteid:'94ABEBE1-85C3-41E8-BC0B-160159689BE4',eoc_sitecertificate:'1vXHJl17GTW3XIK8Zz6jxTpWNmI=',cluster_id_ip:'10.0.130.71'},
  {id:16,camera_ip:''             ,stream_ur:''                                              ,camara_name:'PENDIENTE 12'                                                  ,cluster:2,lat:''         ,long:''          ,eoc_siteid:'5c3b9e5c-81ec-427a-bb3a-61e60fd06734',eoc_sitecertificate:'wFgXOWPKUOUvjrrVNiB6btBG1mI=',cluster_id_ip:'10.0.130.72'},
  {id:17,camera_ip:''             ,stream_ur:''                                              ,camara_name:'PENDIENTE 13'                                                  ,cluster:2,lat:''         ,long:''          ,eoc_siteid:'7173cb10-428c-4cfc-8591-f2aa4b5aca3a',eoc_sitecertificate:'AHpXOaF2k/5FVhVdYe+2LTesph8=',cluster_id_ip:'10.0.130.72'},
  {id:18,camera_ip:'172.16.97.71' ,stream_ur:'rtsp://service:Service.1@172.16.97.71/?inst=1' ,camara_name:'ZP01_PERIFERICO_Y_AV_VALDEPEÑAS_CU9-LPR5-2'                    ,cluster:2,lat:'20.74005' ,long:'-103.39914',eoc_siteid:'0169f541-447b-47cb-bf5a-412d74c2e7a8',eoc_sitecertificate:'6sJkzMdV9qHm6nxsucXZwRMMWGk',cluster_id_ip:'10.0.130.72'},
  {id:19,camera_ip:'10.187.149.4' ,stream_ur:'rtsp://service:Service.1@10.187.149.4/?inst=1' ,camara_name:'TN03_CARR._ZAPOTLANEJO_A_PENAL_PUENTE_GRANDE_ALTA_LPR_5178_1-4',cluster:2,lat:'20.568707',long:'-103.20556',eoc_siteid:'07d3d1b5-1018-4809-9a5a-f5bc88f397dc',eoc_sitecertificate:'odhKcagTD/PV1wJUw0JMyiNKIGU=',cluster_id_ip:'10.0.130.72'},
  {id:20,camera_ip:'172.17.238.74',stream_ur:'rtsp://service:Service.1@172.17.238.74/?inst=1',camara_name:'GU06_AV_PABLO_VALDEZ_Y_BASILIO_BADILLO_A_PANTEON_DER_1_NVA_LPR',cluster:2,lat:'20.6786'  ,long:'-103.31247',eoc_siteid:'15c4eec8-4c10-47ab-91ad-9e63c24e7fb3',eoc_sitecertificate:'z7gMmG85d/QmMefAAdrk7dqgc7A=',cluster_id_ip:'10.0.130.72'},
];
//filtra los datos pendientes
const filteredGrows = grows.filter(grow => grow.camara_name.startsWith('PENDIENTE'));
//datos de la tabla historial
const hrows=[
  {id:1,user:'admi',fecha:'12-04-2023 12:00:05'},
  {id:1,user:'admi',fecha:'12-04-2023 12:03:02'},
  {id:1,user:'admi',fecha:'12-04-2023 12:10:23'},
  {id:2,user:'admi',fecha:'13-04-2023 13:05:34'},
  {id:3,user:'admi',fecha:'13-04-2023 13:07:34'},
  {id:4,user:'admi',fecha:'13-04-2023 13:15:34'},
  {id:5,user:'admi',fecha:'14-04-2023 15:05:34'},
  {id:6,user:'admi',fecha:'14-04-2023 15:50:34'},
  {id:3,user:'admi',fecha:'14-04-2023 15:54:34'},
  {id:1,user:'admi',fecha:'15-04-2023 13:05:34'},
  {id:3,user:'admi',fecha:'15-04-2023 13:07:34'},
  {id:6,user:'admi',fecha:'15-04-2023 13:11:34'},
  {id:8,user:'admi',fecha:'16-04-2023 13:00:34'},
  {id:10,user:'admi',fecha:'17-04-2023 13:05:34'},
  {id:20,user:'admi',fecha:'19-04-2023 13:05:34'},
];
//#region estilos de la tablas
const useStylesPendientes = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 300,
  },
});
const useStylesHist = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 300,
  },
});

const useStylesGral = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 350,
  },
});
//#endregion


export const Eocmenu = (props) => {
  //#region coordenadas de mapa
  const [coordinates, setCoordinates] = useState({ lat: 19, lng: -99 });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCoordinates((prevCoordinates) => ({ ...prevCoordinates, [name]: value }));
  };

  useEffect(() => {
    // Validar las coordenadas aquí si es necesario
  }, [coordinates]);
  //#endregion

  //#region verificación de formaros en inputs
  const [ipValue, setIpValue] = useState("");
  const [isIpValid, setIsIpValid] = useState(true);

  const [strValue, setStrValue] = useState("");
  const [isStrValid, setIsStrValid] = useState(true);

  const handleIpChange = (event) => { //formato de dirección ip xxx.xxx.xxx.xxx
    const value = event.target.value;
    setIpValue(value);
    setIsIpValid(/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value));
  };

  const handlesStrUrChange=(event)=>{ //formato de stream_ur  rtsp://service:Service.0@000.000.000.000/?inst=0
    const value = event.target.value;
    setStrValue(value);
    setIsStrValid(/^rtsp:\/\/[a-zA-Z0-9_-]+:[a-zA-Z0-9_-]+@(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\/\?inst=\d+$/.test(value));
  }
  //#endregion 

  //#region popup
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({});
  
  const openModal = (data) => {
    setEditedData(data);
    setIsModalOpen(true);
  };
  const handleSave = () => {
    // Aquí puedes realizar la lógica para guardar los datos editados
    // por ejemplo, enviar una solicitud al servidor o actualizar el estado de la aplicación
  
    // Después de guardar los datos, cierra el modal
    setIsModalOpen(false);
  };
  //#endregion

  //#region buscador general
    const [searchText, setSearchText] = useState("");
    const [filteredRows, setFilteredRows] = useState(grows);

    const handleSearch = (event) => {
      const searchText = event.target.value.toLowerCase();
      setSearchText(searchText);

      const filteredRows = grows.filter((grow) =>
        Object.values(grow).some((value) =>
          String(value).toLowerCase().includes(searchText)
        )
      );
      setFilteredRows(filteredRows);
    };
  //#endregion

  //#region tablas paginación
    const classesPendientes = useStylesPendientes();
    const [pagePen, setPagePen] = useState(0);
    const [rowsPerPagePen, setRowsPerPagePen] = useState(10);

    const classesHist = useStylesHist();
    const [pageHist, setPageHist] = useState(0);
    const [rowsPerPageHist, setRowsPerPageHist] = useState(6);

    const classesGral = useStylesGral();
    const [pageGral, setPageGral] = useState(0);
    const [rowsPerPageGral, setRowsPerPageGral] = useState(10);
  
    const handleChangePagePendientes = (Pevent, PnewPage) => {
      setPagePen(PnewPage);
    };

    const handleChangePageHist = (Hevent, HnewPage) => {
      setPageHist(HnewPage);
    };

    const handleChangePageGral = (Gevent, GnewPage) => {
      setPageGral(GnewPage);
    };
  
    const handleChangeRowsPerPagePendientes = (Pevent) => {
      setRowsPerPagePen(+Pevent.target.value);
      setPagePen(0);
    };

    const handleChangeRowsPerPageHist = (Hevent) => {
      setRowsPerPageHist(+Hevent.target.value);
      setPageHist(0);
    };

    const handleChangeRowsPerPageGral = (Gevent) => {
      setRowsPerPageGral(+Gevent.target.value);
      setPageGral(0);
    };
  //#endregion

  //#region menú
    const [ini, setIni]= useState("");
    const [eocadd,setEocadd]= useState("");
    const [eocupdate,setEocupdate]= useState("");
    const [adduser,setAdduser]=useState("");
    
    function logout(){
      document.getElementById("container").style.display='none';
      document.getElementById("form_login").style.display='block';
      document.getElementById("txtUser").value='';
      document.getElementById("txtPwd").value='';
      document.getElementById("txtUser").focus();
    }

    function inicio(){
      setIni("1");
      setEocadd("0");
      setEocupdate("0");
      setAdduser("0");
      document.getElementById("boxes").style.display='block';
    }

    function eocAdd(){
      setIni("0");
      setEocadd("1");
      setEocupdate("0");
      setAdduser("0");
      document.getElementById("boxes").style.display='none';
    }

    function eocUpdate(){
      setIni("0");
      setEocadd("0");
      setEocupdate("1");
      setAdduser("0");
      document.getElementById("boxes").style.display='none';
    }

    function addUser(){
      if(props.usu == "admin"){
        setIni("0");
        setEocadd("0");
        setEocupdate("0");
        setAdduser("1");
      }else{
        alert("No tienes permitido entrar a esta opción")
      }
    }
  //#endregion
  return (
    <div id='container' className='h-100'>
      <div id="caja_menu">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <label className="" href=" ">Menú </label>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <NavLink to="" className="nav-link  h5  text-center" onClick={inicio} >Inicio</NavLink>
                <NavLink to="" className="nav-link  h5  text-center" onClick={eocAdd} >Agregar</NavLink>
                <NavLink to="" className="nav-link  h5  text-center" onClick={eocUpdate} >Modificar</NavLink>
                <NavLink to="" className="nav-link  h5  text-center" onClick={addUser} >Agregar Usuario</NavLink>
              </div>
            </div>
            <div><b><i class="bi bi-person">{props.usu.toUpperCase()}  </i></b><a href='' onClick={logout}>Cerrar sesión</a></div>
          </div>
        </nav>
      </div>
      
      {eocadd==="1" && <Eocagregar/>}
      {eocupdate==="1" && <Eocmodificar/>}
      {adduser==="1" && <Adduser/>}

      <div id='boxes'>
        <div className="box01">
          <div id='historial'>
            <center><h3>Historial</h3></center>
            <TableContainer className={classesHist.container}>
              <table className='table table-dark table-hover'>
                <thead>
                  <tr align='center'>
                    <th>Id</th>
                    <th>Usuario</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {hrows.slice(pageHist * rowsPerPageHist, pageHist * rowsPerPageHist + rowsPerPageHist).map((Hrow) => (
                    <tr align='center'>
                      <td>{Hrow.id}</td>
                      <td>{Hrow.user}</td>
                      <td>{Hrow.fecha}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[6,10, 25, 100]}
              component="div"
              count={hrows.length}
              rowsPerPage={rowsPerPageHist}
              page={pageHist}
              onPageChange={handleChangePageHist}
              onRowsPerPageChange={handleChangeRowsPerPageHist}
              id='pagination'
            />
          </div>
          <div id='pendientes'>
            <center><h3>Pendientes</h3></center>
            <TableContainer className={classesPendientes.container}>
              <table className='table table-dark table-hover'>
                <thead>
                  <tr align='center'>
                    <th>Id</th>
                    <th>Camara_name</th>
                    <th>cluster</th>
                    <th>eoc_siteid</th>
                    <th>eoc_sitecertificate</th>
                    <th>cluster_id_ip</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGrows.slice(pagePen * rowsPerPagePen, pagePen * rowsPerPagePen + rowsPerPagePen).map((Prow) => (
                    <tr align='center'>
                      <td>
                        <button className='btn btn-warning' onClick={() => openModal(Prow)}>{Prow.id}</button>
                      </td>
                      <td>{Prow.camara_name}</td>
                      <td>{Prow.cluster}</td>
                      <td>{Prow.eoc_siteid}</td>
                      <td>{Prow.eoc_sitecertificate}</td>
                      <td>{Prow.cluster_id_ip}</td>
                    </tr>
                    ))}
                </tbody>
              </table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={filteredGrows.length}
              rowsPerPage={rowsPerPagePen}
              page={pagePen}
              onPageChange={handleChangePagePendientes}
              onRowsPerPageChange={handleChangeRowsPerPagePendientes}
              id='pagination'
            />
          </div>              
        </div>
        <div className='box02'>
          <div id='general'>
            <center><h3>General</h3></center>
            <nav className="navbar navbar-dark bg-dark" id='navS'>
              <div className="container-fluid">
                <form className="d-flex">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"><i class="bi bi-search"></i></span>
                  </div>
                  <input className="form-control" type="search" placeholder="Buscar..." value={searchText} onChange={handleSearch}/>
                  <button className="btn btn-light" type="submit">Search</button>
                </form>
                <button className='btn btn-danger'>Descargar csv</button>
              </div>
            </nav>
            
            <TableContainer className={classesGral.container}>
            <table className='table table-dark table-hover'>
                <thead>
                  <tr align='center'>
                    <th>Id</th>
                    <th>camera_ip</th>
                    <th>stream_ur</th>
                    <th>camara_name</th>
                    <th>cluster</th>
                    <th>lat</th>
                    <th>long</th>
                    <th>eoc_siteid</th>
                    <th>eoc_sitecertificate</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.slice(pageGral * rowsPerPageGral, pageGral * rowsPerPageGral + rowsPerPageGral).map((Grow) => (
                    <tr align='center'>
                      <td>
                        <button className='btn btn-warning' variant="link">{Grow.id}</button>
                      </td>
                      <td>{Grow.camera_ip}</td>
                      <td>{Grow.stream_ur}</td>
                      <td>{Grow.camara_name}</td>
                      <td>{Grow.cluster}</td>
                      <td>{Grow.lat}</td>
                      <td>{Grow.long}</td>
                      <td>{Grow.eoc_siteid}</td>
                      <td>{Grow.eoc_sitecertificate}</td>
                    </tr>
                    ))}
                </tbody>
              </table>
            </TableContainer>
            <TablePagination
              id='pagination'
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={grows.length}
              rowsPerPage={rowsPerPageGral}
              page={pageGral}
              onPageChange={handleChangePageGral}
              onRowsPerPageChange={handleChangeRowsPerPageGral}
            />
          </div>
        </div>
      </div>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content:{
            background:'#212529',
            border:'6px solid orange',
            borderRadius:'10px',
            height:'auto',
            color:'white',
          }
        }}
      >
        {/* Aquí puedes agregar el contenido del formulario de edición */}
        <h2>Editar datos para {editedData.camara_name}</h2>
          <div className='row'>
            <div className='col-2' id='tittle'><label htmlFor=""><strong>id:</strong></label></div>
            <div className="col-1"><label htmlFor=""><strong>{editedData.id}</strong></label></div>
          </div>

          <div className="row">
            <div className='col-2'id='tittle'><label htmlFor=""><strong>camera ip:</strong></label></div>
            <div className="col-6"><input className="form-control form-control-m text-center" type="search" value={ipValue} onChange={handleIpChange}/></div>
          </div>
        
          <div className="row">
            <div className='col-2' id='tittle'><label htmlFor=""><strong>stream_ur:</strong></label></div>
            <div className="col-6"><input className="form-control form-control-m text-center" type="search" value={strValue} onChange={handlesStrUrChange}/></div>
          </div>

          <div className="row">
            <div className='col-2' id='tittle'><label htmlFor=""><strong>camera_name:</strong></label></div>
            <div className="col-6"><input className="form-control form-control-m text-center" type="search"/></div>
          </div>
          <div style={{width:'100%', display:'flex'}}>
            <div style={{width:'50%'}}>
              <div className='row' >
                <div className='col-4' id='tittle'><label htmlFor="" ><strong>lat:</strong></label></div>
                <div className="col-4">
                  <input 
                    className="form-control form-control-m text-center" 
                    type="number" 
                    id="latitud"
                    name="lat"
                    value={coordinates.lat}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="row">
                <div className='col-4' id='tittle'><label htmlFor="" ><strong>long:</strong></label></div>
                <div className="col-4">
                  <input 
                    className="form-control form-control-m text-center" 
                    type="number"
                    id="longitud"
                    name="lng"
                    value={coordinates.lng}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className='row'>
                <div className='col-4' id='tittle'><label htmlFor=""><strong>cluster:</strong></label></div>
                <div className="col-1"><label htmlFor=""><strong>{editedData.cluster}</strong></label></div>
              </div>

                <div>
                  <div className='row'>
                    <div className='col-4' id='tittle'><label htmlFor=""><strong>eoc_siteid:</strong></label></div>
                    <div className="col-6"><label htmlFor="" ><strong>{editedData.eoc_siteid}</strong></label></div>
                  </div>

                  <div className='row'>
                    <div className='col-4' id='tittle'><label htmlFor="" ><strong>eoc_sitecertificate:</strong></label></div>
                    <div className="col-6"><label htmlFor=""><strong>{editedData.eoc_sitecertificate}</strong></label></div>
                  </div>
                </div>
                
                <br/>

                <div className="row" align='right'>
                  <div className="col-4"><button className="btn btn-success btn-lg" onClick={handleSave}>Guardar Datos</button></div>
                  <div className="col-4"><button className="btn btn-danger btn-lg" onClick={() => setIsModalOpen(false)}>Cancelar</button></div>
                </div>
            </div>
            <div style={{width:'50%', height:'500px', marginTop:'15px'}}>
              <MapContainer center={[coordinates.lat, coordinates.lng]} zoom={15} style={{ height: '100%', width: '100%'}}>
                <TileLayer 
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[coordinates.lat, coordinates.lng]} />
              </MapContainer>
            </div>
          </div>
      </ReactModal>
    </div>
  )
}
/*git init
 
git add .
 
git commit -m "first commit"
 
git branch -M main
 
git remote add origin https://github.com/Genita212/WebPageJalisco.git
 
git push -u origin main */