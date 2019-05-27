const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors')

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
    res.json(database.users)
})

app.post("/register", (req, res) => {
    const {
        email,
        password,
        name
    } = req.body
    database.users.push({
        id: 12,
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date(),
        rank: database.users.length + 1
    })
    res.json("Successfully Registered")
})

app.post("/signin", (req, res) => {
    const user = database.users.filter((user) => {
        return (req.body.email === user.email)
    })
    if (user.length > 0 && user[0].password === req.body.password) {
        res.json(user[0])
    } else {
        res.status(400).json(false)
    }

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
