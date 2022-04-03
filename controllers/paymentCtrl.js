const Payments = require('../models/paymentModel')
const Users = require('../models/userModel')
const Products = require('../models/productModel')

const paymentCtrl = {
    getPayments: async (req, res) => {
        try {
            const payments = await Payments.find()
            res.json( payments)
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    createPayment: async (req, res) => {
        try {
            //Lấy dữ liệu name và email ngay trong bảng Users để in bill, 
            //nó hơi khác phần userModel vì userModel là tạo tài khoản, nhập dữ liệu đầu vào
            const user = await Users.findById(req.user.id).select('name email')
            if(!user) return res.status(400).json({ message: "User does not exist"})

            const {cart, paymentID, address} = req.body;
            const {_id, name, email } = user

            //khi đã có những dữ liệu trên add vào các thành phần trong paymentModel, thì sẽ tạo bảng Payments
            const newPayment = new Payments({ 
                user_id: _id, name, email, cart, paymentID, address
            })

            cart.filter(item => {
                return sold(item._id, item.quantity, item.sold)
            })

            console.log(newPayment)
            await newPayment.save();
            // res.json({message: 'Payment Successfully 😊'})
            res.json({ newPayment })
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

//tạo hàm riêng tên là sold, nhiệm vụ là để khi mà người ta mua hàng xong, thì nó sẽ hiện tổng số lượng hàng đã bán đi với sản phẩm này
//để người ta xem mặt hàng này được nhiều người mua không
const sold = async (id, quantity, oldSold) => {
    await Products.findOneAndUpdate({_id:id}, { 
        sold: quantity + oldSold
    })
}

module.exports = paymentCtrl