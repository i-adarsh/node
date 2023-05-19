const express = require('express');
const { 
    createUser, 
    userLogin, 
    getAllUsers, 
    getUserById,
    deleteUserByID,
    updateUser,

 } = require('../controller/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', createUser);
router.get("/login", userLogin);
router.get("/getAllUsers", getAllUsers);
router.get("/:id", authMiddleware, getUserById);
router.delete("/:id", deleteUserByID);
router.post("/:id", updateUser);
module.exports = router;