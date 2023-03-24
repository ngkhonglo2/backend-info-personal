const userControllers = require('../controllers/userController')

const router = require("express").Router();

router.post('/register', userControllers.createUser)

router.get('/', userControllers.getAllUser)

module.exports = router