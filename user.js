const mongoose = require("mongoose");
const { Schema } = require("mongoose"); 

main().then(() => {
    console.log("Connected to DB");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const userSchema = new Schema({
    name: String,
    addresses: [
        {
            _id: false, 
            location: String,
            city: String,
        }
    ]
})

const User = mongoose.model("User", userSchema);

const addUser = async () => {
    let user1 = new User({
        name: "aditya",
        addresses: [
            {
 
                location: "Time Square",
                city: "New York"
            }
        ]
    })

    user1.addresses.push({location: "22B Satin Sen Sarani", city: "kolkata"})

    let result = await user1.save();
    console.log(result);
}

addUser();
