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

// customerSchema.pre("findOneAndDelete", async() => {
//     console.log("Pre Middleware");
    
// })

customerSchema.post("findOneAndDelete", async (customer) => {
    if (customer.orders.length) {
        let res = await Order.deleteMany({ _id: { $in: customer.orders } });
        console.log(res);
        
    }
    // console.log(data);
})

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

// const findCustomer = async () => {
    
//     let result = await Customer.find().populate("orders");

//     console.log(result[0]);
// }

// findCustomer();

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


const addCustmor = async () => {
    const newCust = new Customer({
        name: "Eve",
    })

    const newOrder = new Order({
        item: "Pizza",
        price: 250
    })

    newCust.orders.push(newOrder);

    const res = await newCust.save();
    const res2 = await newOrder.save();

    console.log(res, res2);
}


const deleteCustomer = async () => {
    let data = await Customer.findByIdAndDelete("66a8d1ef84f8cbfa2249f89c");
    console.log(data);
}



// addCustmor();

deleteCustomer();
