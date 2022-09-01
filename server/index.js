const bodyParser = require('body-parser');
const { query } = require('express');
const express = require('express')
const app = express()
const mysql = require('mysql');
const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt')


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'anirudh2628*',
    database: 'blog-react',
    charset: 'utf8mb4',
    collatiom: 'utf8mb4_unicode_ci'
});


app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}));


app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());


app.use(session(
    {
        key: "user",
        secret: "anirudh2628*",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 60 * 24,
        },
    }
));
const saltLevel = 10;

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;

app.post('/api/signup', (req,res) => {
    const username = req.body.username;
    const sqlQuery2 = `SELECT * from users where username = ${username};`;
    db.query(sqlQuery2, (err,responce) => {
        if(responce) {
            res.send({reEnterData: true, message: "USER ALREADY EXISTS"})
        }
    })

    const password = req.body.password;
    bcrypt.hash(password, saltLevel, (err, hash) => {
        const sqlQuery = 'INSERT INTO users (username, password, connections, bio, date) VALUES (?,?,0,"",?)';
        db.query(sqlQuery, [username,hash,today], (error, responce) => {
            console.log("USER REGISTERED")
            console.log(error);
        })
    })
    const sqlQuery1 = ` CREATE TABLE ${username} ( 
        id int AUTO_INCREMENT PRIMARY KEY,
        tweet varchar(500),
        date varchar(10),
        time time,
        bio varchar(60))
        ;`;
    db.query(sqlQuery1, (err, resp) => {
        req.session.user = username
        res.send(username)
    });
})


app.post('/api/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const sqlQuery = "SELECT * FROM users WHERE username = ?;";
    db.query(sqlQuery, username, (err, responce) => {
        if (responce.length > 0) {
            bcrypt.compare(password, responce[0].password, (error, result) => {
                if (result) {
                    req.session.user = responce[0].username
                    res.send(responce); 
                }
                else {
                    res.send({message: "INCORRECT PASSWORD!"});
                }
            })
        }
        else {
            res.send({message: "NO USER FOUND"});
        }
    })
})

app.get('/api/logout', (req,res) => {
    req.session.destroy((err) => {
        res.clearCookie('user')
        res.send({loggedIn: false})
    });
})

app.get('/api/login-chk', (req,res) => {
    if (req.session.user) {
        res.send({loggedIn: true, user: req.session.user})
    }
    else {
        res.send({loggedIn: false})
    }
})


app.get('/api/get-tweets', (req, res) => {
    const sqlQuery = `SELECT * FROM ${req.session.user}`;
    db.query(sqlQuery, (err, responce) => {
        res.send(responce)
    });
})

app.get('/api/get-userinfo', (req,res) => {
    res.send(req.session.user)
})


app.post('/api/insert-tweet', (require, res) => {
    const tweet = require.body.tweet;
    const sqlQuery = `INSERT INTO ${require.session.user} (tweet, date) VALUES (?,?)`;
    db.query(sqlQuery, [tweet, today], (err, result) => {
        res.send(result)
        console.log(err);
    });
});

app.get('/api/get-userProfile-data', (req,res) => {
    const username = req.body.username;
    const sqlQuery = `SELECT * FROM ${username}`;
    db.query(sqlQuery, (require, responce) => {
        res.send(responce);
    })
})

app.get('/api/search-people', (req,res) => {
    const sqlQuery = `SELECT username FROM users`
    db.query(sqlQuery, (err,responce) => {
        res.send(responce)
    })
})

app.post('/api/connection-req', (req,res) => {
    const connection = req.body.connect
    if (connection === true) {
        var connection1, connection2 = 0
        const connectionTo = req.body.connectionTo
        const connectionFrom = req.body.connectionFrom
        const sqlQuery =  `INSERT INTO user-connections (connectionFrom, connectionTo) VALUES (?,?);`
        db.query(sqlQuery, (err,responce) => {
            console.log(err);
            console.log("USER FOLLOWED");
        })
        const sqlQuery1 = `SELECT connections FROM users WHERE username = ?;`
        db.query(sqlQuery1, [connectionTo], (err,resp) => {
            connection1 = resp
        })
        const sqlQuery2 = `SELECT connections FROM users WHERE username = ?;`
        db.query(sqlQuery2, [connectionFrom], (err, resp) => {
            connection2 = resp
        })
        
        connection1 = connection1 + 1;
        connection2 = connection2 + 1;
        console.log(connection1);
        console.log(connection2);

        const sqlQuery3 = `UPDATE users WHERE username = ? SET connections = ?;`
        db.query(sqlQuery3, [connectionFrom,connection1], (err,resp) => {
            console.log(err);
            // console.log("CONNECTION COUNT INCREASED");
        })
        const sqlQuery4 = `UPDATE users WHERE username = ? SET connections = ?;`
        db.query(sqlQuery4, [connectionTo,connection2], (err,resp) => {
            // console.log("CONNECTION COUNT INCREASED");
        })
            
    }
})

app.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});