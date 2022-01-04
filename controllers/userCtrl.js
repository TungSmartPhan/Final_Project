const Users = require('../models/userModel')


const userCtrl = {
    register:  async (req, res) => {
        try {
            res.json({ message:"Register Test"})
        } catch (error) {
            return res.status(500).json({ message: error.message})
        }
    }
}

module.exports = userCtrl