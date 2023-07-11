const express = require('express')
const router = express.Router()
const userController = require('../controller/user')
const taskController = require('../controller/task')
const auth = require('../middleware/auth')


router.post('/create',userController.create)
router.post('/login',userController.login)
router.post('/task/:userId',auth.authentication,auth.authorization,taskController.createTask)
router.get('/tasks/:userId',auth.authentication,auth.authorization,taskController.getAllTasks)
router.put('/task/:userId/:taskId',auth.authentication,auth.authorization,taskController.updateTask)
router.delete('/task/:userId/:taskId',auth.authentication,auth.authorization,taskController.deleteTask)

//WRONG PATH
router.all('/*', (req, res) => {
    res.status(400).send({
        status: false,
        message: 'Path not found'
    })
})

module.exports = router