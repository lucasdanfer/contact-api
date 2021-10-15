const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    init_module: {
        type: mongoose.Schema.ObjectId,
        ref: 'module'
    },
    modules: [{
        type: mongoose.Schema.ObjectId,
        ref: 'module'
    }]
}, {
    versionKey: false
})

module.exports = mongoose.model('contact', schema);