const express = require('express');
const router = express.Router()

// ============= Auth ===============
const {signIn} =require('../controllers/Auth')
router.post('/signin', signIn)


// =========== User/Admin ============


module.exports = router