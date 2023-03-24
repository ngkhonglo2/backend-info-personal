const userService = require('../services/userService')

const userControllers = {
    createUser: async (req, res) => {
        await userService.createNewUser(req.body, res);
    },
    getAllUser: async (req, res) => {
        await userService.getAllUser(res)
    }
}

module.exports = userControllers