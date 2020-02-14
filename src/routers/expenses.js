const express  = require('express')
const Expense = require('../models/expense')
const router = express.Router()

router.post('/expenses', async (req, res) => {
    const expense = new Expense(req.body)

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
