const express = require("express");
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex');

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const imagecount = require('./controllers/imagecount')

const app = express();
app.use(bodyParser.json())
app.use(cors())

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '43215',
        database: 'facedetection'
    }
})

app.get("/", (req, res) => {
    res.json("WELCOME")
})

app.post("/register", register.handleRegister(db, bcrypt))

app.post("/signin", signin.handleSignin(db,bcrypt))

app.put('/imagecount', imagecount.handleImageCount(db,bcrypt))

app.listen(3000, () => {
    console.log("App is running at port 3000")
})

// app.get('/profile/:id', (req, res) => {
//     const {
//         id
//     } = req.params;
//     let found = false;
//     database.users.forEach(user => {
//         if (user.id == id) {
//             found = true;
//             return res.json(user)
//         }
//     });
//     if (!found) {
//         res.status(400).json("not found")
//     }

// })