const { Users } = require("../../models");

exports.getUsers = async (req, res) => {
  try {
    const data = await Users.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).send({
      status: "SERVER ERROR",
    });
  }
};

exports.destroyUser = async (req, res) => {
  try {
    const { id } = req.params;
    await Users.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: "delete user successfully..",
    });
  } catch (error) {
    res.status(500).send({
      status: "SERVER ERROR",
    });
  }
};

exports.createImageProfile = async (req, res) => {
  try {
    const data = await Users.update(
      {
        imgprofile: req.files.imageProfile[0].filename,
      },
      {
        where: {
          id: req.userid.id,
        },
      }
    );
    res.send({
      status: "success",
      message: "update profile success..",
    });
  } catch (error) {
    res.status(500).send({
      status: "SERVER ERROR",
    });
  }
};

exports.getDetailUser = async (req, res) => {
  try {
    const { id } = req.userid;
    const data = await Users.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["password"],
      },
    });
    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).send({
      status: "SERVER ERROR",
    });
  }
};
