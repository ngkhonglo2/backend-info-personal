const authControllers = require('../controllers/authController')
const middlewareController = require('../controllers/middlewareController')

const router = require('express').Router()

router.post('/login', authControllers.loginUser);
router.post("/logout", middlewareController.verifyToken, authControllers.logoutUser)

module.exports = router