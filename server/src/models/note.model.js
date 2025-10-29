const mongoose = require('mongoose');


const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },

    content: {
        type: String,
        required: true,
        trim: true,
        maxLength: 1000
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Note', noteSchema)