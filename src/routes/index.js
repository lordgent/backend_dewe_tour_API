const express = require("express");
const router = express.Router();

// ===== middleware =======

const { authuser, AuthAdm } = require("../middleware/authentication");
const { uploadFile } = require("../middleware/uploadFile");

// ============= Auth ==============

const { signIn, signUp } = require("../controllers/auth");
router.post("/signin", signIn);
router.post("/signup", signUp);

// =========== User/Admin ===========

const {
  getUsers,
  destroyUser,
  getDetailUser,
  createImageProfile,
  updateUser,
} = require("../controllers/users");
router.get("/users", authuser, AuthAdm, getUsers);
router.delete("/user", authuser, AuthAdm, destroyUser);
router.get("/user/:id", authuser, getDetailUser);
router.put("/user", authuser, uploadFile("imageProfile"), createImageProfile);
router.put("/userr", authuser, updateUser);
// ==== Trip =====

const {
  createTrip,
  getTrips,
  DetailTrip,
  updateTrip,
  deleteTrip,
} = require("../controllers/trip");

router.post("/trip", authuser, AuthAdm, uploadFile("imageTrip"), createTrip);
router.get("/trips", authuser, getTrips);
router.get("/trip/:id", authuser, DetailTrip);
router.put("/tripp/:id", authuser, AuthAdm, updateTrip);
router.delete("/trip:/id", authuser, AuthAdm, deleteTrip);
// ==== country ======

const {
  addCountry,
  getCountries,
  getDetailcountry,
  updateCountry,
  deleteCountry,
} = require("../controllers/country");
router.post("/country", authuser, AuthAdm, addCountry);
router.get("/countries", authuser, AuthAdm, getCountries);
router.get("/country/:id", authuser, AuthAdm, getDetailcountry);
router.put("/country/:id", authuser, AuthAdm, updateCountry);
router.delete("/country/:id", authuser, AuthAdm, deleteCountry);

// ====== Transaction =======

const {
  addTransaction,
  getTransactions,
  UserPayment,
  detailTransactionByidUser,
  approveTransaction,
} = require("../controllers/transaction");
router.post("/transaction", authuser, addTransaction);
router.get("/transactions", authuser, AuthAdm, getTransactions);
router.put(
  "/transaction/:id",
  authuser,
  uploadFile("imagePayment"),
  UserPayment
);

router.get("/transaction", authuser, detailTransactionByidUser);
router.put("/transactionn/:id", authuser, AuthAdm, approveTransaction);

module.exports = router;
