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
                // console.log(decoded);
                const user = await User.findById(decoded?.id);
                request.user = user;
                next();
            }
        } catch (error) {
            throw new Error("Not Authorized Token Expired, Please login again")
        }
    } else {
        throw new Error("There is no token attached with header")
    }
})

const isAdmin = asyncHandler( async (request, response, next) => {
    const { email } = request.user;
    // console.log(email);
    const isAdminUser = await User.findOne({ email });
    // console.log(isAdminUser.role);
    if (isAdminUser.role !== 'admin') {
        throw new Error("You are not an Admin user");
    } else {
        next();
    }
    // console.log(request.user);
})

module.exports = { authMiddleware, isAdmin };