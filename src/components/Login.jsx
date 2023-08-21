import "./Login.css"
import React,{useState} from 'react';
import { Eocmenu } from './Eocmenu';


export const Login = () => {
    const [miLogin, setMiLogin]=useState("false");
    const [usu,setusu]=useState("");
    const [pass,setPass]=useState("");

    function iniciaSesion(e){
        e.preventDefault();
        var txtuser= document.getElementById("txtUser").value;
        var txtpass= document.getElementById("txtPwd").value;
        if(txtuser.length===0){
            alert("No has ingresado usuario");
        }else if(txtpass.length===0){
            alert("No has ingresado contraseña");
        }
        else{
            if(usu==="admin" && pass==="1234"){
                setMiLogin("true");
                document.getElementById("form_login").style.display="none";
            }else{
                setMiLogin("false");
                alert("Usuario o contraseña incorrecto")
                document.getElementById("txtUser").value="";
                document.getElementById("txtPwd").value="";
                document.getElementById("txtUser").focus();
            }
        }
    }

  return (
    <div id="boddy">
        <form id='form_login' className='Principal'>
            <div>
            <h1>Login</h1>
                <label className="logi" htmlFor='lblUser'><strong>Usuario:</strong></label><br />
                <input type='text'id='txtUser' className='form-control' onChange={(e)=>setusu(e.target.value)} required/>
            </div>
            <div>
                <label className="logi" htmlFor='lblPwd'><strong>Contraseña:</strong></label><br />
                <input type="password" id='txtPwd' className='form-control' onChange={(e)=>setPass(e.target.value)} required/>
                <br />
                <input type="submit" onClick={iniciaSesion}  className="btn btn-warning" value="Login"/>
            </div>
            <br />
            </form>
        {miLogin==="true" &&  <Eocmenu usu={usu}/>}
    </div>
  )
}
