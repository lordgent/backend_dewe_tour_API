const { Trip, Country } = require("../../models");

exports.createTrip = async (req, res) => {
  try {
    let {
      title,
      idcountry,
      accomodation,
      transpotation,
      eat,
      day,
      night,
      datetrip,
      price,
      quota,
      desc,
    } = req.body;
    let arr = [];
    for (let i = 0; i < req.files.imageTrip.length; i++) {
      let datas = req.files.imageTrip[i].filename;
      arr.push(datas);
    }
    const data = await Trip.create({
      title: title,
      idcountry: idcountry,
      accomodation: accomodation,
      transpotation: transpotation,
      eat: eat,
      day: day,
      datetrip: datetrip,
      night: night,
      price: price,
      quota: quota,
      desc: desc,
      imagestrip: JSON.stringify(arr),
    });
    const image = JSON.parse(data.imagestrip);
    const img = image.map((item) => {
      return "http://localhost:5005/uploads/images/" + item;
    });

    res.send({
      status: "success",
      data: {
        title: data.title,
        accomodation: data.accomodation,
        transpotation: data.transpotation,
        eat: data.eat,
        day: data.day,
        night: data.night,
        datetrip: data.datetrip,
        price: data.price,
        quota: data.quota,
        description: data.desc,
        img,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.getTrips = async (req, res) => {
  try {
    const data = await Trip.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.DetailTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Trip.findOne({
      where: {
        id,
      },
      include: {
        model: Country,
        as: "Countries",
        attributes: {
          exclude: ["cretaedAt", "updatedAt", "id"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    const images = JSON.parse(data.imagestrip);
    const image = images?.map((item, idx) => {
      return "http://localhost:5005/uploads/images/" + item;
    });

    res.send({
      status: "success",
      detail: {
        title: data.title,
        country: data.Countries.namecountry,
        acomodation: data.accomodation,
        transpotation: data.transpotation,
        eat: data.eat,
        day: data.day,
        night: data.night,
        price: data.price,
        image,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.updateTrip = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Trip.update(req.body, {
      where: {
        id,
      },
    });

    res.send({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Trip.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: "Delete Trip successfully..",
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
