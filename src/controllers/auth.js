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

    if (!data) {
      return res.status(400).send({
        status: "failed",
        message: "username/password incorrect",
      });
    }

    const validd = await bcrypt.compare(password, data.password);
    if (!validd) {
      return res.status(400).send({
        status: "failed",
        message: "username/password incorrect",
      });
    }

    const token = jwt.sign(
      { id: data.id, status: data.role },
      process.env.TOKEN_KEY
    );
    res.send({
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
    res.status(500).send({
      status: "failed",
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
      data: {
        fullname: data.fullname,
        email: data.email,
        status: data.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server Error",
    });
  }
};
