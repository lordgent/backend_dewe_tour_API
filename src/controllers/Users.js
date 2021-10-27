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


exports.destroyUser = async (req,res) => {
    try {
        const {id} =req.params;
        await Users.destroy({
            where: {
                id
            }
        })
        res.send({
            status: 'success',
            message: 'delete user successfully..'
        });
    } catch (error) {
        res.status(500).send({
            status: 'SERVER ERROR'
        });
    }
}