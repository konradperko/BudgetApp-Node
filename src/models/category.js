const mongoose = require('mongoose')

const Category = mongoose.model('Category', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    subcategories: {
        type: [String],
        required: true
    },
    type: {
        type: String,
        enum: ['EXPENSES', 'EARNINGS'],
        required: true
    }
})

module.exports = Category
