import React from "react";
import '../css/main.css'
import Axios from "axios";

export default function Tweet(props){
    
    const [tweetFetch, setTweetfetch] = React.useState([])

    React.useEffect(() => {
        Axios.get('http://localhost:3001/api/get-tweets').then(
            (result) => {
                if (result.data.length > 0) {
                    setTweetfetch(result.data)
                } else {
                    setTweetfetch([])
                }
            })
        }, [])
    const tweetMap = tweetFetch.slice(0).reverse().map((value) => {
        if (value.id > 0) {
            return <div className="tweet">
                        <div className="tweet-info">
                            <img src="/img/user-icon1.png" width = '25px' alt="USER" className="tweet-user-img" />
                            <p>{props.username} {value.date}</p>
                            <div className="tweet-more-options">
                                <span className="material-symbols-outlined">more_vert</span>
                            </div>
                        </div>
                        <div className="tweet-content">
                            <p>{value.tweet}</p>
                        </div>
                        <div className="tweet-control">
                            <div className="tweet-control-1">
                                <span class="material-symbols-outlined">favorite</span>
                            </div>
                            <div className="tweet-control-2 border-left border-right">
                                <span class="material-symbols-outlined ">comment</span>
                            </div>
                            <div className="tweet-control-3">
                                <span class="material-symbols-outlined">share</span>
                            </div>
                        </div>
                    </div>
        }
        else {
            return <><p>No dat </p></>
        }
    })


    return(
        <>        
            {tweetMap}            
        </>

    )
}
