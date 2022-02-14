const Users = require('../models/userModel')

const authAdmin = async (req, res, next) => {
    try {
        const user = await Users.findOne({_id: req.user.id})

        if(user.role !==1)
        return res.status(500).json({message: "Admin resource access denied"})

        next();
    } catch (error) {
        return res.status(500).json({ message: message.error})
    }
}

module.exports = authAdmin