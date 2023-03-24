const authService = require('../services/authService')

const authControllers = {
    loginUser: async (req, res) => {
        await authService.loginUser(req.body, res);
    },
    logoutUser: async (req, res) => {
        await authService.logoutUser(req.cookies, res)
    }
}

module.exports = authControllers