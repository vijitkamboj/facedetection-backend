const express = require("express");
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex');

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

app.post("/register", (req, res) => {
    const {
        email,
        password,
        name
    } = req.body
    const hash = bcrypt.hashSync(password)
    db.transaction(trx => {
        trx.insert({
                email: email,
                hash: hash
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return (
                    trx('users').insert({
                        name: name,
                        email: loginEmail[0],
                        joined: new Date()
                    }).then(res.json("Successfully Registered"))
                )
            }).then(trx.commit)
            .then(trx.rollback)
    }).catch(err => res.status(400).json(err))

})

app.post("/signin", (req, res) => {
    db('login').select('*').where('email', '=', req.body.email)
    .then( (user) => {
        if (user === []) {
            return(res.json(false))
        } else {
            let isValid = bcrypt.compareSync(req.body.password, user[0].hash);
            if (isValid === true) {
                return (
                    db('users').select('*').where('email', '=',req.body.email )
                    .then(User => res.json(User[0]))
                )
            } else {
                return (res.json(false))
            }
        }

    }).catch(err => {res.status(400).json(false)})

})

app.get('/profile/:id', (req, res) => {
    const {
        id
    } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id == id) {
            found = true;
            return res.json(user)
        }
    });
    if (!found) {
        res.status(400).json("not found")
    }

})
app.put('/imagecount', (req, res) => {
    const {
        id,
        count
    } = req.body;
    db('users').where('id', '=', id).increment('entries', count)
    .catch(err => "error in increasing count " , err)
    db('users').select('entries').where('id' ,'=', id).then(
        data => res.json({
            entries : data[0].entries
        })
    ).catch( err => 'Error while selecting entries ',err)
})


app.listen(3000, () => {
    console.log("App is running at port 3000")
})
