const express = require("express")
const userController = require("../controllers/user.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const roleMiddleware = require("../middlewares/role.middleware")
const router = express.Router();

//  Get profile (Protected route) 
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);

// Admin only :LIST ALL USERS
router.get('/', authMiddleware, roleMiddleware('admin'), userController.getAllUsers)

module.exports = router;
