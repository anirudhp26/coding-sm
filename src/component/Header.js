import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../css/main.css'
import Axios from "axios";

export default function Header() {
    Axios.defaults.withCredentials = true;
    const [loginStatus, setLoginstatus] = React.useState('');
    const [loginRedirect, setLoginredirect] = React.useState('/login');
    const [search, setSearch] = React.useState('')
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
    let path = `/login`; 
    navigate(path);
  }
    React.useEffect(() => {
        Axios.get('http://localhost:3001/api/login-chk').then((responce) => {
            if (responce.data.loggedIn === true) {
                setLoginstatus(responce.data.user)
                setLoginredirect(responce.data.user);
            }
            else {
                routeChange();
            }
        })
    }, [])
    const searchPeople = (e) => {
        const searchIndex = e.target.value;
        Axios.get('http://localhost:3001/api/search-people').then((responce) => {
            const newSearch = responce.data.filter((value) => {
                return value.username.includes(searchIndex);
            })
            setSearch(newSearch);
        })

        if (searchIndex == '') {
            document.getElementById("search-result").style.visibility = 'hidden';
        } else {
            document.getElementById("search-result").style.visibility = 'visible';
        }
    }

    return (
    <>
        <nav className="navbar">
            <p className="nav-logo">code-blog</p>
            <ul className="nav-ul"> 
                <li className="nav-li"><a><Link to='/'>HOME</Link></a></li>
                <li className="nav-li"><a><Link to='/tweets'>TWEETS</Link></a></li>
                <li className="nav-li"><a><Link to='/blogs'>BLOGS</Link></a></li>
                <li className="nav-li"><a><Link to='/Dimensions'>EXPLORE DIMENSIONS</Link></a></li>
                <li className="nav-li"><a><Link to='/Contribute'>CONTRIBUTE</Link></a></li>
            </ul>
            <div className="search-div">
                <input type='text' placeholder="Search" className="search-bar" onChange={searchPeople}></input>
                {search.length != 0 && (
                    <div className="search-result"  id="search-result">
                        {search.slice(0, 15).map((value,key) => {
                            return <a href={`/${value.username}`}>{value.username}</a>
                        })}
                    </div>
                )}
            </div>
            <div className="user-info">
                <img src="/img/user-icon1.png" width = '50px' alt="USER" className="navbar-logo-img" />
                <Link to={loginRedirect}><a>{loginStatus}</a></Link>  
            </div>
        </nav>
    </>
    )
}