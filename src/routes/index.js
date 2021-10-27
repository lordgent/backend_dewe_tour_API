const express = require('express');
const router = express.Router()

// ==== token ====
const {authuser,AuthAdm} =require('../middleware/Auth')


// ============= Auth ===============
const {signIn,signUp} =require('../controllers/Auth')
router.post('/signin', signIn)
router.post('/signup', signUp)

// =========== User/Admin ============

const {getUsers,destroyUser,getDetailUser} = require('../controllers/Users')
router.get('/users', authuser, AuthAdm, getUsers)
router.delete('/user', authuser,AuthAdm, destroyUser)
router.get('/user', authuser, getDetailUser)

// ==== country ======
const {addCountry} = require('../controllers/country')
router.post('/country', authuser,AuthAdm, addCountry)

module.exports = router

