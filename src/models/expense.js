const mongoose = require('mongoose')

const CategorySchema = mongoose.model('Category').schema

const Expense = mongoose.model('Expense', {
    category: {
        type: CategorySchema,
        required: true,
    },
    subcategory: {
        type: String,
        require: true,
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
