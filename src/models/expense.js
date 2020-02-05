const mongoose = require('mongoose')

const Expense = mongoose.model('Expense', {
    category: {
        type: String,
        required: true,
        trim: true,
    },
    cost: {
        type: Number,
        required: true,
        min: 0,
    },
    date: {
        type: Date,
        required: true,
    },
})

module.exports = Expense
