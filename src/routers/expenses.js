const express  = require('express')
const Expense = require('../models/expense')
const router = express.Router()
const { CategoryWithSubcategories } = require('../models/category')

router.post('/expenses', async (req, res) => {
    const expense = new Expense(req.body)
    const categoryName = req.body.category.name
    const subcategory = req.body.subcategory
    try {
        await CategoryWithSubcategories.findOne(
            { name: categoryName },
            null,
            function (err, docs) {
                if (err) { return res.status(400).send(err) }
                if (!docs) { return res.status(400).send(`Could not find category ${categoryName}`) }
                const isSubcategory = docs.subcategories.some(sub => sub === subcategory)
                if(!isSubcategory) {
                    return res.status(400).send(`subcategory ${subcategory} was not found for category ${categoryName}`)
                }
            },
        )
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

router.patch('/expenses/:id', async (req, res) => {
    const { body, params } = req
    const { id } = params
    const updates = Object.keys(body)
    const allowedUpdates = ['category', 'cost', 'date']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const expense = await Expense.findById(id)
        
        updates.forEach((update) => expense[update] = req.body[update])
        await expense.save()

        return expense
            ? res.send(expense)
            : res.status(404).send()
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/expenses/:id', async (req, res) => {
    const { id } = req.params

    try {
        const expense = await Expense.findByIdAndDelete(id)

        return expense
            ? res.send(expense)
            : res.status(404).send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
