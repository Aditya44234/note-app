const express = require("express")
const { registerValidation, loginValidation } = require("../validations/auth.validation")
const router = express.Router();
const validate = require("../middlewares/validation.middleware")




const authcontroller = require("../controllers/auth.controller")


// registration endpoint
router.post('/register', registerValidation, validate, authcontroller.register);

// Login endpoint
router.post('/login', loginValidation, validate, authcontroller.login);

module.exports = router;
