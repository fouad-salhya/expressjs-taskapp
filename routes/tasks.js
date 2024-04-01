const { Router } = require('express')
const router = Router()

const { requireSignin } = require('../middlewares/auth')
const { createTask, deleteTask } = require('../controllers/TaskController')


router.post('/create', requireSignin, createTask)
router.delete('/delete', requireSignin, deleteTask)



module.exports = router