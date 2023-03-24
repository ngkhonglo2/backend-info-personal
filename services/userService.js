const bcrypt = require('bcrypt')
const User = require("../models/User")

// su dung de dang ky account
let createNewUser = async (data, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(data.password, salt)
        
        // create new user
        const newUser = await new User({
            userName: data.userName,
            email: data.email,
            password: hashed,
        })
        
        // Save to user
        const user = await newUser.save();
        res.status(200).json(user)
    } catch (err) {
      console.log('trùng name hoặc email');
      res.status(500).json(err)
    }
};

let getAllUser = async (res) => {
    try {
        const user = await User.find()
        res.status(200).json(user)

    } catch(err) {
        res.status(500).json(err)
    }
}

module.exports = {
    createNewUser,
    getAllUser
}