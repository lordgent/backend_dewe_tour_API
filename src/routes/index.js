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
const {addCountry,getCountries,getDetailcountry,updateCountry,deleteCountry} = require('../controllers/country')
router.post('/country', authuser,AuthAdm, addCountry)
router.get('/countries', authuser,AuthAdm, getCountries)
router.get('/country/:id', authuser,AuthAdm,getDetailcountry)
router.put('/country/:id', authuser,AuthAdm,updateCountry)
router.delete('/country/:id', authuser,AuthAdm,deleteCountry)

module.exports = router

