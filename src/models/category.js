const mongoose = require('mongoose')
const { TYPES } = require('../configs/categories.config')

const CategoryModel = {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        enum: [...Object.keys(TYPES)],
        required: true,
    },
}
const Category = mongoose.model('Category', CategoryModel)
const CategoryWithSubcategories = mongoose.model('CategoryWithSubcategories', {
    ...CategoryModel,
    subcategories: {
        type: Array,
        required: true,
    },
})

module.exports = {
    Category,
    CategoryWithSubcategories,
}
