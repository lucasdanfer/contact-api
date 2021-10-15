const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    block: {
        type: Boolean,
        required: true
    },
    default: {
        type: mongoose.Schema.ObjectId,
        ref: 'state'
    },
    messages: [{
        type: mongoose.Schema.ObjectId,
        ref: 'message'
    }]
}, {
    versionKey: false
})

module.exports = mongoose.model('state', schema);