import React from "react";
import '../css/main.css'
import Tweets from "./Tweets";
export default function Home() {
    
    return(
        <>
            <div className="home-container">
                <p>Learn in Public</p>
                <p>Teach in Public</p>
                <p>Share your Experiences</p>
            </div>
            <div className="home-quote">
                <p><h1>initiative to connnect coders from around the world</h1></p>
            </div>
            <Tweets />
        </>
    )
}   