const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/', User.login)
router.post('/newUser', User.newUser)

module.exports = router