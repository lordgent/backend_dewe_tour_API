const {Users} = require('../../models');
const jwt = require('jsonwebtoken')

exports.authuser = (req,res,next) => {

  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
      return res.status(401).send({
        message: "Access denied!!",
      });
    }
    try {
          const verified = jwt.verify(token, process.env.TOKEN_KEY);
          req.userid = verified;
          next();
    } catch (error) {
      console.log(error);
        res.status(400).send({
            message: "Invalid Token.. | Bad Request ",
       });
    }
}


exports.AuthAdm = async (req, res, next) => {
    try {
      const { id } = req.userid;
      const cekstatus = await Users.findOne({
        where: {
          id,
        },
      });
      cekstatus.role !== "admin"
        ? res.status(401).send({
            status: "not response",
            message: "Access Denied!",
          })
        : next();
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "SERVER ERROR",
      });
    }
  };
  