const db = require('../db/db_connection')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const secret = process.env.SECRET

// Goes through the database to see if the username is already taken
function checkUserExistance(name){
    return new Promise((resolve, reject) => {
        let holdData = 0
        db.any('SELECT * FROM users WHERE username = $1', name)
        .then(data => {
           resolve(data.length)
        })
        .catch(err => console.log(err))
    }
    )
    
}

const newUser = async (req, res) => {
    const d = await checkUserExistance(req.body.username) // can also use .then() for promises like ive been using so far, but giving async/await a wirl 
    if(d === 0) {
        // req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        db.none('INSERT INTO users (id, username, password) VALUES (${id}, ${username}, ${password})', req.body)
        .then(()=>res.json({message:"User Made"}))
        .catch(err=> res.json({err, message:"User not made"}))
    }
    else res.json({message: "Username already exists"})

}

const login = (req, res ) => {
    db.one('SELECT * FROM users WHERE username = $1', req.body.username)
    .then(data => {
        // if(bcrypt.compareSync(req.body.password, data.password)){
        //     jwt.sign({data:"This is the payload"}, secret, {expiresIn: '1d'}, 
        //     (err, token)=>{res.status(201).append('Accept','true').json({token, err})}
        //     )
        // }
        if(req.body.password === data.password){
            jwt.sign({data:"This is the payload"}, secret, {expiresIn: '1d'}, 
            (err, token)=>{res.status(201).append('Accept','true').json({token, err})}
            )
        }
        else res.json({message: "wrong username or Password"})
    })
    .catch(err => {
        // console.log("oopsie")
        // console.log(err)
        res.json({message: "wrong Username or password"})
    })


}

module.exports = {
    login,
    newUser
}