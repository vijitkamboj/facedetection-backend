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
    res.send(database.users)
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

app.get('/profile/:id', (req,res) => {
    const {id} = req.params;
    let found =false ;
    database.users.forEach( user => {
        if (user.id == id){
            console.log(user.id , id);
            found =true;
            return res.json(user)
        }
    });
    if (!found){
        res.status(400).json("not found")
    }

})

app.put('/imagecount', (req,res) => {
    const {id} = req.body;
    let found =false ;
    database.users.forEach( (user) => {
        if (user.id === id){
            found =true;
            user.entries++;
            return(res.json(user.entries))
        }
    })
    if (!found){
        res.status(400).json("not found")
    }
    

})

app.listen(3000 , () => {
    console.log("App is running at port 3000")
})









