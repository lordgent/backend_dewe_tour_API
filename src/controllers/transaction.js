const { Transaction, Trip, Users, Country } = require("../../models");

exports.addTransaction = async (req, res) => {
  try {
    const upd = await Trip.findOne({
      where: {
        id: req.body.idtrip,
      },
    });

    const data = await Transaction.create({
      iduser: req.userid.id,
      idtrip: req.body.idtrip,
      qty: req.body.qty,
      payment: null,
      subtotal: upd.price * req.body.qty,
      status: "waiting payment",
    });

    await Trip.update(
      {
        quota: upd?.quota - req.body.qty,
      },
      {
        where: {
          id: upd.id,
        },
      }
    );
    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const data = await Transaction.findAll({
      include: [
        {
          model: Users,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "id",
              "address",
              "email",
            ],
          },
        },
        {
          model: Trip,
          as: "Trips",
          include: {
            model: Country,
            as: "Countries",
            attributes: {
              exclude: ["createdAt", "id", "updatedAt"],
            },
          },
          attributes: {
            exclude: [
              "createdAt",
              "imagestrip",
              "updatedAt",
              "desc",
              "price",
              "",
            ],
          },
        },
      ],
      attributes: {
        exclude: ["updatedAt", "idtrip", "iduser"],
      },
    });
    res.send({
      status: "success",
      transctiosns: data,
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.UserPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Transaction.update(
      {
        payment: req.files.imagePayment[0].filename,
        status: "waiting approve",
      },
      {
        where: {
          id,
        },
      }
    );

    res.send({
      status: "success",
      transctiosns: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.detailTransactionByidUser = async (req, res) => {
  try {
    const data = await Transaction.findAll({
      where: {
        iduser: req.userid.id,
      },
    });

    res.send({
      status: "success",
      transctiosns: data,
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
    });
  }
};
