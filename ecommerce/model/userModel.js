const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt");
// !mdbgum
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        index:true,
    },
    lastName:{
        type:String,
        required:true,
        index:true,
    },
    email:{
        type:String,
        required: [true, "Please add the user email address"],
        unique: [true, "Email address already taken"],
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required: [true, "Please add the user password"],
    },
    role: {
        type: String,
        default: "user",
    },
    cart: {
        type: Array,
        default: [],
    },
    address: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address"}],
    wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
},{
    timestamps: true,
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

//Export the model
module.exports = mongoose.model('User', userSchema);