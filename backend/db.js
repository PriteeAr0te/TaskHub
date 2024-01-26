const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/TaskHub';

const connectToMongo = async()=>{
   try {
    await mongoose.connect(mongoURL)
    console.log("Connected To MongoDB Successfully")
   }
   catch(error) {
    console.log("Error in Connected to Database:", error)
   }
}

module.exports = connectToMongo;