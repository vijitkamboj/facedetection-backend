const express = require("express");
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex');

const db = knex({
    client : 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '43215',
        database: 'facedetection'
    }
})

const app = express();

app.use(bodyParser.json())
app.use(cors())

const database = {
    users: [{
            id: 0,
            name: 'Vijit',
            email: "vijitkamboj92@gmail.com",
            password: "cookies",
            entries: 0,
            joined: new Date(),
            rank: 1

        },
        {
            id: 1,
            name: 'Nikhil',
            email: "nikhil@gmail.com",
            password: "nikhil",
            entries: 0,
            joined: new Date(),
            rank: 2
        }
    ],

    login: [{
        id: '987',
        hash: '',
        email: 'vijitkamboj92@gmail.com'
    }]
}

const ranker = () => {
    database.users.sort((a, b) => b.entries - a.entries)
    database.users.map((user, i) => {
        user.rank = i + 1
    })
}

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
    }).catch( err => res.status(400).json(err))

})

app.post("/signin", (req, res) => {
    

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
    let found = false;
    database.users.forEach((user) => {
        if (user.id === id) {
            found = true;
            user.entries += count;
            ranker()
            return (res.json({
                entries: user.entries,
                rank: user.rank
            }))
        }
    })

    if (!found) {
        res.status(400).json("not found")
    }


})


app.listen(3000, () => {
    console.log("App is running at port 3000")
})
