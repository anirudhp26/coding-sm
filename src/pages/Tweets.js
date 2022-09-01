import React from "react";
import '../css/main.css'
import Tweet from "../component/Tweet";
import autosize from "autosize";
import Axios from "axios";

export default function Tweets() {
    const [tweet, setTweet] = React.useState('');
    const [username, setUsername] = React.useState('');

    const tweetSubmit = () => {
        Axios.post('http://localhost:3001/api/insert-tweet', {tweet: tweet}).then(() => {
            window.location.reload();
        })
    };

    const handleKeypress = e => {
        if (e.keyCode === 13) {
            tweetSubmit();
        }
    }

    React.useEffect(() => {
        Axios.get('http://localhost:3001/api/get-userinfo').then((responce) => {
            setUsername(responce.data);
        })
    }, [])
    return (
        <>
            <div className="tweet-write">
                <textarea id="story" name="story" rows ="3" cols="53" onChange={(e) => {
                    setTweet(e.target.value)
                }} onKeyDown={handleKeypress}>
                </textarea>
                    {document.addEventListener('DOMContentLoaded', function () {
                        autosize(document.querySelectorAll('#story'));
                    }, false)}

                    
                <div>
                    <a onClick={tweetSubmit}>TWEET</a>
                </div>
            </div>
            
            <div className="tweet-container">
                <Tweet username={username}/>
            </div>
        </>
    )
}   