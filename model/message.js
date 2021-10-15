const mongoose = require('mongoose');

const schema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    statement: {
        type: Object,
        required: true
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('message', schema);