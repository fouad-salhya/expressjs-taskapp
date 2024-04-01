const { Router } = require('express')
const router = Router()

const { getAccount, deleteAccount } = require('../controllers/UserController')
const { requireSignin } = require('../middlewares/auth')


router.get('/account', requireSignin, getAccount)
router.delete('/account/delete', requireSignin, deleteAccount)



module.exports = router