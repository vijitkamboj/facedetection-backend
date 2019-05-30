const controller = (db,bcrypt) => (req,res) => {
    db('login').select('*').where('email', '=', req.body.email)
    .then( (user) => {
        if (user === []) {
            return(res.json(false))
        } else {
            let isValid = bcrypt.compareSync(req.body.password, user[0].hash);
            if (isValid === true) {
                return (
                    db('users').select('*').where('email', '=',req.body.email )
                    .then(User => {
                        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
                        res.setHeader('Access-Control-Allow-Methods', 'POST');
                        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                        res.setHeader('Access-Control-Allow-Credentials', true);
                        res.json(User[0])
                    })
                )
            } else {
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
                res.setHeader('Access-Control-Allow-Methods','POST');
                res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                res.setHeader('Access-Control-Allow-Credentials', true);
                return (res.json(false))
            }
        }

    }).catch(err => {res.status(400).json(false)})
}

module.exports = {
    handleSignin : controller
}