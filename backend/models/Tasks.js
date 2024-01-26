const mongoose = require('mongoose');
const {Schema} = mongoose;

const TaskSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String
    },
    due_date:{
        type:Date,
        required: true,
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('task', TaskSchema)