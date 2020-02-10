const express  = require('express')
const Category = require('../models/category')
const router = express.Router()

const TYPES = {
    EXPENSES: 'EXPENSES',
    EARNINGS: 'EARNINGS'
}

router.post('/category', async (req, res) => {
    const category = new Category(req.body)
    try {
        await category.save()
        res.status(201).send(category)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/categories', async ({ query }, res) => {
    const isNotAnyType = Boolean(query.type && (query.type !== TYPES.EXPENSES && query.type !== TYPES.EARNINGS))
    const foreignType = isNotAnyType && query.type
    const type = new Map([
        [TYPES.EXPENSES, TYPES.EXPENSES],
        [TYPES.EARNINGS, TYPES.EARNINGS],
        [foreignType, new Error("Only 'EXPENSES' or 'EARNINGS' values are allowed for TYPE.")],
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
