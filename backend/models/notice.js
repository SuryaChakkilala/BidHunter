const mongoose = require('mongoose')

const noticeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Schema.Type.ObjectId,
        required: true,
        ref: 'Product'
    }
})

exports.Notice = mongoose.model('Notice', noticeSchema)