const { Trip, Imagetrip } = require("../../models");

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
      console.log(arr);
    }

    console.log(req.files.imageTrip[0].filename);

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

    res.send({
      status: "success",
      image: JSON.parse(data.imagestrip),
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "SERVER ERROR",
    });
  }
};
