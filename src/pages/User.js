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
    const [connections, setConnections] = React.useState('0');
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
        Axios.get('http://localhost:3001/api/get-userProfile-data', {username: user}).then(
            (responce) => {
                setConnections(responce.data.connections)
                setBio(responce.data.bio)
            }
        )
    }, [connections, user]);
    
    React.useEffect(() => {
        if (chkUsername.toString().localeCompare(username) === 0) {
            setBtn('EDIT PROFILE')
            setConnectbtn(true)
        }
        else {
            setBtn('FOLLOW')
            setConnectbtn(false)
        }
    }, [chkUsername, username]);

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
                alert(responce.data.message)
            })
        }
        else {
            Axios.post('http://localhost:3001/api/connection-req', {connect: false, connectionFrom: chkUsername, connectionTo: user})
            
        }
        setConnection(!connection)
        alert("connectionReq")
    }

    const edit_connect_btn = () => {
        if (connectBtn === true) {
            return (
                <Popup
            trigger={<button>{btn}</button>}
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
                <button onClick={connectionReq}>{connection === true ? "DISCONNECT" : "CONNECT"}</button>
            )
        }
    }

    const ecBtn = edit_connect_btn();
    
    return(
        <>
            <div>
                this is profile page for {username}
            </div>
            {ecBtn}
            <button onClick={logout}>logout</button>
        </>

    )
}