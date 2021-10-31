const { Users } = require("../../models");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signIn = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(4).required(),
    password: Joi.string().min(4).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const { email, password } = req.body;
    const data = await Users.findOne({
      where: {
        email: email,
      },
    });

    const validd = await bcrypt.compare(password, data.password);

    if (!validd) {
      return res.status(400).send({
        status: "Failed",
        message: "username/password incorrect",
      });
    }
    const token = jwt.sign(
      { id: data.id, status: data.role },
      process.env.TOKEN_KEY
    );
    res.status(200).send({
      status: "success",
      data: {
        id: data.id,
        fullname: data.fullname,
        email: data.email,
        token_status: token.status,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "ERROR",
      message: "server Error",
    });
  }
};

exports.signUp = async (req, res) => {
  const Schema = Joi.object({
    fullname: Joi.string().min(4).required(),
    nophone: Joi.string().min(12).required(),
    gender: Joi.string().required(),
    address: Joi.string(),
    email: Joi.string().min(4).required(),
    password: Joi.string().min(8).required(),
    role: Joi.string(),
  });

  const { error } = Schema.validate(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const cekmail = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (cekmail) {
      return res.status(400).send({
        status: "Bad Requests",
        message: "email/fullname is already",
      });
    }
    const { fullname, nophone, gender, address, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const data = await Users.create({
      fullname: fullname,
      nophone: nophone,
      gender: gender,
      address: address,
      email: email,
      password: hashed,
      role: "user",
    });

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "SERVER ERROR",
    });
  }
};
