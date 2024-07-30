const mongoose = require("mongoose");
const { Schema } = require("mongoose"); 

main().then(() => {
    console.log("Connected to DB");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const userSchema = new Schema({
    username: String,
    email: String
})

const postSchema = new Schema({
    content: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// const addData = async()=>{
//     let user3 = await User.findOne({ username: "adityanaida" });

//     const post2 = new Post({
//         content: 'Bye Good night !',
//         likes: 25,
//     })

//     post2.user = user3;

//     const res2 = await post2.save();

//     console.log(res2);
// }

// addData();

// const deletePost = async () => {
//     const res = await Post.findByIdAndDelete("66a8dda2c929f1f4df50e5b9");
//     console.log(res);
// }

// deletePost();

const getData = async () => {
    let result = await Post.findOne({}).populate("user", "username");
    console.log(result);
}

getData();