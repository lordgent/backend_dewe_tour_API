const { Country } = require("../../models");

exports.addCountry = async (req, res) => {
  try {
    const data = await Country.create(req.body);
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

exports.getCountries = async (req, res) => {
  try {
    const data = await Country.findAll();
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

exports.getDetailcountry = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Country.findOne({
      where: {
        id,
      },
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

exports.updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    await Country.update(req.body, {
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: "update country successfully...",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "SERVER ERROR",
    });
  }
};

exports.deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;
    await Country.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: "Delete country successfully...",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "SERVER ERROR",
    });
  }
};
