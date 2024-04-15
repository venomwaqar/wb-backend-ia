const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const config = require("../config/config.js");

function generateAccessToken (user) {
    return jwt.sign(user, config.ACCESS_TOKEN_SECRET, {expiresIn: "15m"})
}

async function compareHashPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)
}

function verifyJWT(token) {
    const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
    return decoded;
}

module.exports = {
    generateAccessToken,
    compareHashPassword,
    verifyJWT
}