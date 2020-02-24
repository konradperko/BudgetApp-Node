const express  = require('express')
const User = require('../models/user')
const router = express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/users/:id', async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/users/:id', async (req, res) => {
    const { body } = req
    const { id  } = req.params
    const updates = Object.keys(body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findByIdAndDelete(id)

        return user
            ? res.send(user)
            : res.status(404).send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
