const controller = (db,bcrypt) => (req,res) =>{
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
}

module.exports = {
    handleRegister : controller
}