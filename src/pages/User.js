import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import Popup from 'reactjs-popup'

export default function User() {
    let { username } = useParams();

    let navigate = useNavigate(); 
    const routeChange = (path) =>{ 
        navigate(path);
  }
    
    const [user, setUser] = React.useState('');

    //this connection state is for storing number of connection info gathered from the api
    const [connections, setConnections] = React.useState(0);
    const [bio, setBio] = React.useState('');
    const [chkUsername, setchkUsername] = React.useState('');
    const [btn, setBtn] = React.useState('');
    const [connectBtn, setConnectbtn] = React.useState(true);

    //this connection state is for connect btn toggle
    const [connection, setConnection] = React.useState(false);
    const [newUsername, setNewUsername] = React.useState('');

    React.useEffect(() => {
        Axios.get('http://localhost:3001/api/get-userinfo').then((responce) => {
            setchkUsername(responce.data);
        })
        setUser(username);
    }, [username])
    
    React.useEffect(() => {
        if (chkUsername.toString().localeCompare(username) === 0) {
            setBtn('EDIT PROFILE')
            setConnectbtn(true)
            Axios.post('http://localhost:3001/api/getProfiledata', {user: chkUsername}).then((responce) => {
                setConnections(responce.data[0].connections)
                setBio(responce.data[0].bio)
            })
        }
        else {
            setConnectbtn(false)
            Axios.post('http://localhost:3001/api/getProfiledata', {user: username}).then((responce) => {
                setConnections(responce.data[0].connections)
                setBio(responce.data[0].bio)
            })
        }
    }, [chkUsername, username]);

    React.useEffect(() => {
        Axios.post('http://localhost:3001/api/connection-chk', {connectionFrom: chkUsername, connectionTo: user}).then((responce) => {
            if (responce.data.connected === true) {
                setConnection(true)
                var element1 = document.getElementById("connection-line-vertical");
                element1.classList.toggle("connection-line-vertical-glow")
            }
            else {
                setConnection(false)
                var element1 = document.getElementById("connection-line-vertical");
                element1.classList.remove("connection-line-vertical-glow")
            }
        })
    }, [connections]);

    const logout = () => {
        Axios.get('http://localhost:3001/api/logout').then((responce) => {
            if (responce.data.loggedIn === false) {
                routeChange('/login');
            }
        })
    }

    const updateProfile = () => {
        alert('updateProfile')
        // Axios.get('http://localhost:3001/api/update-profile').then((responce) => {
        //     routeChange(`/${user}`)
        // })
    }

    const connectionReq = () => {
        if (connection === false) {
            Axios.post('http://localhost:3001/api/connection-req', {connect: true, connectionFrom: chkUsername, connectionTo: user}).then((responce) => {
                window.location.reload();
                
            })
        }
        else {
            Axios.post('http://localhost:3001/api/connection-req', {connect: false, connectionFrom: chkUsername, connectionTo: user}).then((responce) => {
                window.location.reload();
            })
            
        }
        // setConnection(!connection)
    }

    const edit_connect_btn = () => {
        if (connectBtn === true) {
            return (
                <Popup
            trigger={<button className="user-follow-edit-btn">{btn}</button>}
            modal
            nested
            >
                <div className="updateProfile-popup">
                        <input type='text' placeholder='new username' onChange={(e) => {setNewUsername(e.target.value)}}/>
                        <input type='password' placeholder='current password' />
                        <button onClick={updateProfile}>SAVE</button>        
                    </div>

            </Popup>
            )
        }
        else if (connectBtn === false){
            return (
                <button onClick={connectionReq} className="user-follow-edit-btn" id="user-btn-glow">{connection === true ? "DISCONNECT" : "CONNECT"}</button>
            )
        }
    }

    const ecBtn = edit_connect_btn();

    // const lineGlow = () => {
    //     var element = document.getElementById("connection-line-vertical-btn");
    //     const list = element.classList.toggle("connection-line-vertical-btn-glow")
    // }

    return(
        <>
            <div className="connection-line-horizontal">
            </div>
            <div className="connection-line-vertical" id="connection-line-vertical"></div>
            <div className="user-profile-root">
                <div className="user-profile-toplayer">
                    <div className="user-profile-pp">
                        <img src="/img/user-icon1.png" />
                    </div>
                    <div className="user-profile-stats">
                        <div className="user-profile-username">{username}</div>
                        <div className="user-stats-head"> Connections</div>
                        <div className="user-stat">{connections}</div>
                    </div>
                </div>
                <div className="user-bio">
                    {bio}
                </div>
                <div className="user-profile-btn">
                    {ecBtn}
                </div>
            </div>
            <button onClick={logout}>logout</button>
        </>

    )
}