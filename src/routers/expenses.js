const express  = require('express')
const Expense = require('../models/expense')
const router = express.Router()
const { CategoryWithSubCategories } = require('../models/category')

router.post('/expenses', async (req, res) => {
    const expense = new Expense(req.body)
    const categoryName = req.body.category.name
    const categoryType = req.body.category.type
    const subCategory = req.body.subCategory
    Expense.findOne(
        { 'category.name': categoryName },
        null,
        function (err, docs) {
            if (err) { return res.status(400).send(err) }
            if (!docs) { return res.status(400).send(`Could not find category ${categoryName}`) }
            if (docs.category.type !== categoryType) {
                return res.status(400).send(`Could not match type ${categoryType} with category ${categoryName}`)
            }
        },
    )
    CategoryWithSubCategories.findOne(
        { name: categoryName },
        ['subCategories', 'type'],
        function (err, docs) {
            if (err) { return res.status(400).send(err) }
            const isSubCategory = docs.subCategories.some(sub => sub === subCategory)
            if(!isSubCategory) {
                return res.status(400).send(`SubCategory ${subCategory} was not found for category ${categoryName}`)
            }
        },
    )
    try {
        await expense.save()
        res.status(201).send(expense)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/expenses', async (req, res) => {
    try {
        const expenses = await Expense.find()
        res.send(expenses)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
