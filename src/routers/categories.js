const express  = require('express')
const { CATEGORY_URL, TYPES } = require('../configs/categories.config')
const { CategoryWithSubcategories } = require('../models/category')

const router = express.Router()
const { EARNINGS, EXPENSES, SAVINGS } = TYPES

router.post(CATEGORY_URL, async (req, res) => {
    const category = new CategoryWithSubcategories(req.body)
    try {
        await category.save()
        res.status(201).send(category)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get(CATEGORY_URL, async ({ query }, res) => {
    const isQueryNotAllowed = query.type !== EXPENSES &&
        query.type !== EARNINGS &&
        query.type !== SAVINGS
    const isNotAnyType = Boolean(query.type && isQueryNotAllowed)
    const foreignType = isNotAnyType && query.type
    const type = new Map([
        [EXPENSES, EXPENSES],
        [EARNINGS, EARNINGS],
        [SAVINGS, SAVINGS],
        [
            foreignType,
            new Error("Only 'EXPENSES', 'EARNINGS' or 'SAVINGS' values are allowed for TYPE."),
        ],
    ]).get(query.type)

    if(type instanceof Error) { return res.status(400).send(type.message) }

    try {
        const allCategories = await CategoryWithSubcategories.find()
        const categories = type
            ? allCategories.filter(category => category.type === type)
            : allCategories
        res.send(categories)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
