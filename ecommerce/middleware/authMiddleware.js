const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler=  require("express-async-handler");

const authMiddleware = asyncHandler ( async (request, response, next) => {
    let token;
    if (request?.headers?.authorization?.startsWith('Bearer')) {
        token = request.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
                console.log(decoded);
            }
        } catch (error) {
            throw new Error("Not Authorized Token Expired, Please login again")
        }
    } else {
        throw new Error("There is no token attached with header")
    }
})

module.exports = { authMiddleware };