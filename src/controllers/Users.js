const {Users} =require('../../models');

exports.getUsers = async (req,res) => {


    try {
        const data = await Users.findAll({
            attributes: {
                exclude: ["password"]
            }
        })

        res.send({
            status: 'success',
            data
        });
        

    } catch (error) {
        res.status(500).send({
            status: 'SERVER ERROR'
        });

    }

}