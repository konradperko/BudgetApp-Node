const mongoose = require('mongoose')
const { TYPES } = require('../configs/categories.config')

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
        enum: [...Object.keys(TYPES)],
        required: true
    }
})

module.exports = Category
