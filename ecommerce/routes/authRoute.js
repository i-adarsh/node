const express = require('express');
const { 
    createUser, 
    userLogin, 
    getAllUsers, 
    getUserById,
    deleteUserByID,
    updateUser,
    blockUser,
    unBlockUser,

 } = require('../controller/userController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', createUser);
router.get("/login", userLogin);
router.get("/getAllUsers", getAllUsers);
router.get("/:id", authMiddleware, isAdmin, getUserById);
router.delete("/:id", deleteUserByID);
router.put("/edit-user", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser);


module.exports = router;