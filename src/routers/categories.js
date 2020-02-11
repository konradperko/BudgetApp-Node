const express  = require('express')
const { CATEGORY_URL, TYPES } = require('../configs/categories.config')
const Category = require('../models/category')
const router = express.Router()
const { EARNINGS, EXPENSES } = TYPES

router.post(CATEGORY_URL, async (req, res) => {
    const category = new Category(req.body)
    try {
        await category.save()
        res.status(201).send(category)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get(CATEGORY_URL, async ({ query }, res) => {
    const isNotAnyType = Boolean(query.type && (query.type !== EXPENSES && query.type !== EARNINGS))
    const foreignType = isNotAnyType && query.type
    const type = new Map([
        [EXPENSES, EXPENSES],
        [EARNINGS, EARNINGS],
        [
          foreignType,
          new Error("Only 'EXPENSES' or 'EARNINGS' values are allowed for TYPE.")
        ],
    ]).get(query.type)

    try {
        if(type instanceof Error) { throw type }

        const allCategories = await Category.find()
        const categories = type
            ? allCategories.filter(category => category.type === type)
            : allCategories
        res.send(categories)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
