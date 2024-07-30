const mongoose = require("mongoose");
const { Schema } = require("mongoose"); 

main().then(() => {
    console.log("Connected to DB");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const orderSchema = new Schema({
    item: String,
    price: Number
})

const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order" //the refrence is coming from where
        }
    ]
})

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const findCustomer = async () => {
    
    let result = await Customer.find().populate("orders");

    console.log(result[0]);
}

findCustomer();

// const addOrders = async () => {
//     let res = await Order.insertMany([
//         {
//             item: "Samosa",
//             price: 12
//         },
//         {
//             item: "Protein Bar",
//             price: 80
//         },
//         {
//             item: "Creatine",
//             price: 750
//         }
//     ])

//     console.log(res)
// }

// addOrders();


