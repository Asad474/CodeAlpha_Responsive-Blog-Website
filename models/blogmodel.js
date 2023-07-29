const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }, 

    title: {
        type: String,
        required: true
    },
    
    category: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Blog', BlogSchema);