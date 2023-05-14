const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        const getConnection = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(
            'Database Conneted: ', 
            getConnection.connection.host,
            getConnection.connection.name
        );
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;