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
                    .then(User => res.json(User[0]))
                )
            } else {
                return (res.json(false))
            }
        }

    }).catch(err => {res.status(400).json(false)})
}

module.exports = {
    handleSignin : controller
}