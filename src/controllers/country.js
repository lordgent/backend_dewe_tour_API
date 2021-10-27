const {Country} = require('../../models')


exports.addCountry = async (req,res) => {
    try {
        const data = await Country.create(req.body)        
        res.send({
            status: 'success',
            data
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'SERVER ERROR', 
        });
    }
}


