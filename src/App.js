import React from "react";
import Home from './pages/Home'
import Contribute from './pages/Contribute'
import Dimensions from './pages/Dimensions'
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Tweets from './pages/Tweets'
import Axios from "axios";
import User from "./pages/User";
import Error from "./pages/Error";


export default function Index() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path=':username' element={<User />} />
                <Route path="tweets" element={<Tweets />} />
                {/* <Route path="blogs" element={<Blogs />} /> */}
                <Route path="Dimensions" element={<Dimensions />} />
                <Route path="Contribute" element={<Contribute />} />
                <Route path="*" element={<Error />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
