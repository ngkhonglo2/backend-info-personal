const bcrypt = require("bcrypt")
const User = require("../models/User")
const jwt = require("jsonwebtoken")

// generateAccessToken
const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            admin: user.admin
        },
        process.env.JWT_ACCESS_KEY,
        {expiresIn: "7d"}
    )
}


// login
const loginUser = async (data, res) => {
    try {
        const user = await User.findOne({userName: data.userName});
        const validPassword = await bcrypt.compareSync(data.password, user.password);
        if(!user) {
            res.status(404).json("Incorrect userName or password")
        }

        if(!validPassword) {
            res.status(404).json("Incorrect password")
        }

        if(user && validPassword) {
            const accessToken = generateAccessToken(user);
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict"
            })
            const {password, ...other} = user._doc
            res.status(200).json({...other, accessToken})
        }
    } catch (err) {
        res.status(500).json('loi sever')
    }
}

const logoutUser = async (cookie, res) => {
    res.clearCookie("accessToken")
    // refreshTokens = refreshTokens.filter((token) => token !== cookie.accessToken);
    res.status(200).json("logger out!")
}

module.exports = {
    loginUser,
    logoutUser,
}