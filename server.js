const express = require('express')
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3001 ; 

// /////////////////////////////////////////
// MiddleWear
// ////////////////////////////////////////

app.use(express.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true)
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({})
  }
  next();
})

// /////////////////////////////////////////
// Routes
// ////////////////////////////////////////

const userContoller = require('./controllers/userRoutes')
app.use('/users', userContoller)

// ///////////////////////////////////////

app.listen(port, ()=>{console.log("Character sheet is running on port "+ port + (process.env.PORT? " :: env working" : " ") )})