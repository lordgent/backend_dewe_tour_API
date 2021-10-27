const {Users} =require('../../models');
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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
      const {email,password} = req.body
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
      const token = jwt.sign({ id: data.id }, process.env.TOKEN_KEY);
  
      res.status(200).send({
        status: "success",
        data: {
          id: data.id,
          fullname: data.fullname,
          email: data.email,
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
  