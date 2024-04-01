const express = require('express')
const router = express.Router()

const { generateToken } = require('../controllers/BraintreeController')
const { requireSignin } = require('../middlewares/auth')


router.get('/token', requireSignin, generateToken)




module.exports = router