const express = require("express");
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex');

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const image = require('./controllers/image')

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

app.put('/imagecount', image.handleImageCount(db))

app.post('/imageApi', image.handleImageApi )

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running at port ${process.env.PORT}` )
})

