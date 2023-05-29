const User = require("../model/userModel");
const asyncHandler = require('express-async-handler');
const bcrypt = require("bcrypt");
const { generateToken } = require("../config/jwtToken");
const { validateMongoDbId } = require("../utils/validateMongoDbId");

const createUser = asyncHandler (async (request, response) => {
    const {firstName, lastName, email, mobile, password} = request.body;
    const userAvailable = await User.findOne({email});
    if (!firstName || !lastName || !email || !mobile || !password){
        response.status(400).json({message: 'All fields are mandatory'});
    }
    else if (!userAvailable) {
        // Creating new user
        // const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            mobile,
            password: hashedPassword,
        });
        response.status(201).json(newUser);
    } 
    else{
        response.status(400).json({
            message: 'User already exist',
            success: 'false'
        })
    }
});

const userLogin = asyncHandler(async (request, response) => {
    const { email, password } = request.body;
    const userAvailable = await User.findOne({email});
    if (!userAvailable){
        response.status(400).json({message: "User not exist"});
    } else if (userAvailable && await userAvailable.isPasswordMatched(password)){
        response.status(200).json({
            _id: userAvailable?._id,
            firstName: userAvailable?.firstName,
            lastName: userAvailable?.lastName,
            email: userAvailable?.email,
            mobile: userAvailable?.mobile,
            token: generateToken(userAvailable?._id),
            message: "Login Successful"
        });
    } else {
        throw new Error("Invalid Credentials");
    }
    
});

//Get all users
const getAllUsers = asyncHandler (async (request, response) => {
    try {
        const allUsers = await User.find();
        // console.log(allUsers);
        response.status(200).json(allUsers);
    } catch (error){
        throw new Error("Something went wrong");
    }
});

// Get user by ID
const getUserById = asyncHandler( async (request, response) => {
    const { id } = request.params;
    validateMongoDbId(id);
    try {
        const getUser = await User.findById(id);
        response.status(200).json(getUser);
    } catch(error){
        throw new Error("Something went wrong")
    }
});

// Delete user by ID
const deleteUserByID = asyncHandler( async (request, response) => {
    const { id } = request.params;
    validateMongoDbId(id);
    console.log(id);
    try{
        const deleteuser = await User.findByIdAndDelete(id);
        if (deleteuser) response.status(202).json({deleteuser, message: "Record Deleted"});
        else response.status(200).json("User not exist");
    } catch(error) {
        throw new Error('User not deleted');
    }
});

// Update an user
const updateUser = asyncHandler( async (request, response) => {
    // console.log(request.body.id);
    const { _id } = request.user;
    // console.log(_id);
    validateMongoDbId(_id);
    try{
        const user = await User.findByIdAndUpdate(_id, {
            firstName: request?.body?.firstName,
            lastName: request?.body?.lastName,
            email: request?.body?.email,
            mobile: request?.body?.mobile,
        },{
            new: true,
        });
        response.status(202).json({user, message: "Record Updated"});

    } catch (error) {
        throw new Error("Something went wrong")
    }
});

const blockUser = asyncHandler ( async (request, response) => {
    const { id } = request.params;
    validateMongoDbId(id);
    try{
        const user = await User.findByIdAndUpdate(id, {
            isBlocked: true,
        },{
            new: true,
        });
        response.status(202).json({message: "User Blocked", user});
    } catch (error) {
        throw new Error('Failed to block user.')
    }
});

const unBlockUser = asyncHandler ( async (request, response) => {
    const { id } = request.params;
    validateMongoDbId(id);
    console.log(id);
    try {
        const user = await User.findByIdAndUpdate(id, {
            isBlocked: false,
        },{
            new: true,
        });
        response.status(202).json({message: "User unBlocked", user});
    } catch (error) {
        const test = await User.findByIdAndUpdate(id);
        console.log(test);
        throw new Error('Failed to unblock user.')
    }
});

module.exports = { 
    createUser, 
    userLogin, 
    getAllUsers, 
    getUserById,
    deleteUserByID,
    updateUser,
    blockUser,
    unBlockUser,

 };