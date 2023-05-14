const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (request, response, next) => {
    let token;
    let authHeader = request.headers.authorization || request.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err){
                response.status(401);
                throw new Error('User is not authorized');
            }
            request.user = decoded.user;
            next();
            console.log(decoded.user);
        });

        if (!token) {
            response.status(401);
            throw new Error('User is not authorized or token is missing in the request');
        }
    }
});

module.exports = validateToken;