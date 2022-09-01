import React from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loginStatus, setLoginstatus] = React.useState('')
    Axios.defaults.withCredentials = true
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }

  
    const btnClk = () =>{
        Axios.post('http://localhost:3001/api/login', {username: username, password: password}).then(
            (responce) => {
                routeChange();
                }
            )
    }

    const handleKeypress = e => {
        if (e.keyCode == 13) {
            btnClk();
        }
    }
    return(
        <>
            <div className="login-root-container border-left border-right">
                <p className="login-head">LOGIN</p>
                <input type="text" name="username" placeholder="username" id="username" className="login-inputs" onChange={(e) => {setUsername(e.target.value)}}></input>
                <input type="password" name="password" placeholder="password" id="password" className="login-inputs" onChange={(e) => {setPassword(e.target.value)}} onKeyDown={handleKeypress}></input>
                <a className="login-btn" onClick={btnClk} >LOGIN</a>
                <div className="login-more-options">
                    <p>Don't have an account? <a><Link to='/signup' className="login-btn">Sign UP</Link></a></p>
                </div>
            </div>
        </>
    )
}