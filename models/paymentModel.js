const mongoose = require('mongoose')
//Mục đích của việc tạo model này là đễ lưu lại dữ liệu người dùng, khi thanh toán xong
//thông tin người dùng được hiện khi dùng consolo.log(payment), nhưng mới hiện ở web Console.
const paymentSchema = new mongoose.Schema({
user_id:{
    type: String,
    required: true,
}, 
name:{
    type: String,
    required: true,
}, 
email:{
    type: String,
    required: true,
}, 
paymentID:{
    type: String,
    required: true,
}, 
address:{
    type: Object,
    required: true,
}, 
cart:{
    type: Array,
    default: [],
}, 
status:{
    type: Boolean,
    default: false
}
},{
    timestamps: true
})

module.exports = mongoose.model('Payments', paymentSchema)