import React from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup'

export default function Signup() {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    Axios.defaults.withCredentials = true
    let navigate = useNavigate(); 
    const routeChange = (path) =>{ 
    navigate(path);
  }
    const err_popup = () => {
        return(
            <Popup>

            </Popup>
        )
    }

    const loginClk = () =>{
        Axios.post('http://localhost:3001/api/signup', {username: username, password: password}).then(
            (responce) => {
                if (responce.data.reEnterData === true) {
                    
                }
                routeChange('/');
            }
        )
    }


    return(
        <>
            <div className="login-root-container border-left border-right">
                <p className="login-head">SIGN UP</p>
                <input type="text" name="username" placeholder="username" id="username" className="login-inputs" onChange={(e) => {setUsername(e.target.value)}}></input>
                <input type="password" name="password" placeholder="password" id="password" className="login-inputs" onChange={(e) => {setPassword(e.target.value)}}></input>
                <a className="login-btn" onClick={loginClk}>SIGN-UP</a>
                <div className="login-more-options">
                    <p>Already have an account? <a><Link to='/login' className="login-btn">LOGIN</Link></a></p>
                </div>
            </div>
        </>
    )
}