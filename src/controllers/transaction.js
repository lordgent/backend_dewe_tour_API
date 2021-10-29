const { Transaction } = require("../../models");
const Joi = require("joi");

exports.addTransaction = async (req, res) => {
  const schema = Joi.object({
    iduser: Joi.required(),
    idtrip: Joi.required(),
    qty: Joi.required(),
    payment: Joi.string().required(),
    subtotal: Joi.number().required(),
    status: Joi.string().required,
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({
      status: "failed",
      message: error.details[0].message,
    });
  }

  try {
  } catch (error) {}
};
