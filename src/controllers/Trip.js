const {Trip} = require('../../models');

exports.createTrip = async (req,res) => {
    try {
        const {title,idcountry,accomodation,
            transpotation,eat,day,night,datetrip,
            price,quota,desc} = req.body

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
                imagetrip: req.files.imageTrip[0].filename,
            })
            res.send({
                status: 'success',
                data
            });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'SERVER ERROR'
        });

    }
}