const express = require('express');
const router = express.Router()

// ============= Auth ===============
const {signIn,signUp} =require('../controllers/Auth')
router.post('/signin', signIn)
router.post('/signup', signUp)

// =========== User/Admin ============


module.exports = router