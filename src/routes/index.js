const express = require('express');
const router = express.Router()

// ==== token ====
const {authuser,AuthAdm} =require('../middleware/Auth')


// ============= Auth ===============
const {signIn,signUp} =require('../controllers/Auth')
router.post('/signin', signIn)
router.post('/signup', signUp)

// =========== User/Admin ============

const {getUsers} = require('../controllers/Users')
router.get('/users', authuser, AuthAdm, getUsers)

module.exports = router