const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    init_state: {
        type: mongoose.Schema.ObjectId,
        ref: 'state'
    },
    states: [{
        type: mongoose.Schema.ObjectId,
        ref: 'state'
    }]
}, {
    versionKey: false
})

module.exports = mongoose.model('module', schema);