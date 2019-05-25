const express = require("express");
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())

const database ={
    users : [
        {
            id: 0 ,
            name : 'Vijit',
            email : "vijitkamboj92@gmail.com",
            password : "cookies",
            entries: 0,
            joined : new Date()
        },
        {
            id: 1 ,
            name : 'Nikhil',
            email : "19nikhilchauhan@gmail.com",
            password : "nikhil",
            entries: 0,
            joined : new Date()
        }
    ]
}

app.get("/" , (req,res) => {
    res.send("Yeah IT's Working")
})

app.post("/register" ,(req,res) => {
    const {email , password ,name} = req.body
    database.users.push(
        {
            id: 12 ,
            name : name,
            email : email,
            password : password,
            entries: 0,
            joined : new Date()
        }
    )
    res.json(database.users[database.users.length-1])
})

app.post("/signin", (req, res) => {
    const user = database.users.filter((user) => {
        return( req.body.email === user.email)
    })
    
    if ( user.length> 0 && user[0].password === req.body.password){
        res.json( "user Confirmed")
    }else{
        res.status(400).json("error logging in")
    }

})

app.listen(3000 , () => {
    console.log("App is running at port 3000")
})













// / - res = this is working
// /signin - POST , res= success/fail
//  / register - POST -user
// /profile/:userId --> GET  - user
// image-count --> PUT -user